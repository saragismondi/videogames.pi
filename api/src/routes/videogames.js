const axios = require("axios");
const { Router } = require("express");
const rutaJuegos = Router();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

const listadoJuegosApi = async () => {
  const juegosApi = [];
  try {
    const paginaApiUno = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`
    );
    const paginaApiDos = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
    );
    const paginaApiTres = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`
    );
    const resultadoPaginas = [
      ...paginaApiUno.data.results,
      ...paginaApiDos.data.results,
      ...paginaApiTres.data.results,
    ];
    resultadoPaginas.forEach((et) => {
      juegosApi.push({
        id: et.id,
        name: et.name,
        released: et.released,
        image: et.background_image,
        rating: et.rating,
        platforms: et.platforms?.map((e) => e.platform.name),
        genres: et.genres?.map((e) => e.name),
      });
    });
    return juegosApi;
  } catch (error) {
    return error;
  }
};
const infoJuegosBd = async () => {
  const juegosDb = [];
  try {
    var db = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    db.forEach((et) => {
      juegosDb.push({
        id: et.id,
        name: et.name,
        released: et.released,
        image:
          "https://scontent.frcu4-1.fna.fbcdn.net/v/t1.6435-9/118011151_640719076574401_1551517471314191853_n.png?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gybMtUPuJc0AX8rNFfF&_nc_ht=scontent.frcu4-1.fna&oh=00_AT_UozmX6vuVAQRrBYtqWgySrUbP-8UBQrpATFY2FaK31w&oe=62714922",
        rating: et.rating,
        platforms: et.platforms,
        genres: et.genres?.map((e) => e.name),
      });
    });
    return juegosDb;
  } catch (error) {
    return error;
  }
};
const getAllGames = async () => {
  const apiInfo = await listadoJuegosApi();
  const dbInfo = await infoJuegosBd();
  const infoTotal = dbInfo.concat(apiInfo);
  console.log(infoTotal[0], "soy info total");
  return infoTotal;
};
rutaJuegos.get("/", async (req, res) => {
  const name = req.query.name;
  let videogameTotal = await getAllGames();
  if (name) {
    let videogameName = await videogameTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    res.status(200).send(videogameName);
  } else {
    res.status(200).send(videogameTotal);
  }
});
module.exports = rutaJuegos;
