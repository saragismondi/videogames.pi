// [ ] _GET /videogame/{idVideogame}_:
//   - Obtener el detalle de un videojuego en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
const { Router } = require("express");
const axios = require("axios");
const rutaVideogame = Router();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

 //ID
//funcion que me traiga los videojuegos y su relacion generos

const apiId = async (id) => {
  //obtiene ID de la api
  try {
    const idApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const idApiData = await idApi.data; //me trae directamente el objeto, le pido que me traiga especificamente esto
    const idDataLimpia = {
      id: idApiData.id,
      image: idApiData.background_image,
      name: idApiData.name,
      description: idApiData.description, /// _raw
      released: idApiData.released,
      rating: idApiData.rating,
      platforms: idApiData.platforms.map((e) => e.platform.name),
      genres: idApiData.genres.map((e) => e.name),
    };
    //console.log(idDataLimpia);
    return idDataLimpia;
  } catch (error) {
    console.log(error);
  }
};

//obtiene id de la db

const dbId = async (id) => {
  try {
    const dbGame = await Videogame.findByPk(id, { include: Genres }); //que busque el que coincida con ese id que me pasan con pk lo hago
    return {
      id: dbGame.id,
      image: dbGame.background_image,
      name: dbGame.name,
      description: dbGame.description, // aca puede ir description_raw
      released: dbGame.released,
      rating: dbGame.rating,
      platforms: dbGame.platforms,
      genres: dbGame.genres.map((e) => e.name),
    };
  } catch (error) {
    console.log(error);
  }
};

const AllGamesById = async (id) => {
  //aclarar lo de incluir guion para no romper la funcion de la API
  //hacer un if
  const uuId = id.includes("-"); //hago una constante para validar el uuid
  if (uuId) {
    //si me pasan id con guiones entonces busca en bse de datos
    const dbIdInfo = await dbId(id);
    return dbIdInfo; //si esta ahi retornalo
  } else {
    //si no tiene guiones busca en api
    const apiIdInfo = await apiId(id);
    return apiIdInfo;
  }
};

rutaVideogame.get("/:id", async (req, res) => {
  const { id } = req.params;
  const gamesIdApi = await AllGamesById(id);
  gamesIdApi ? res.send(gamesIdApi) : res.send("This game does not exist");
  return;
});
//cuando meto if else en ruta poner return xq sino sigue corriendo


// // ROUTER POST
// - [ ] _POST /videogame_:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//   - Crea un videojuego en la base de datos

rutaVideogame.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    background_image,
    genres,
    platforms,
    createdInDb,
  } = req.body;
  console.log(req.body);

  const videogameCreated = await Videogame.create({
    name,
    description,
    released,
    rating,
    background_image,
    platforms, //hacer que entre en un array directo aunque sea 1 solo juego
    createdInDb,
  }); //

  let genreDb = await Genres.findAll({
    where: {
      name: genres,
      //attributes: ["id"]
    },
  });
   await videogameCreated.addGenres(genreDb); // poner en esperame 
  res.send("Juego Creado"); // dami tiene asi: return res.send(videogameCreated); y tiene un try and catch
});
//MUCHO MUY IMPORTANTE 
// {
//   "name": "EL damian tine cara de sapito ",
//   "description": "ajlsh",
//   "platforms": ["ajajjajajajjhsj"],
//   "released" : "fjdjdjd",
//   "rating": 12.12,
//   "background_image": "https://media.rawg.io/media/games/238/2383a172b4d50a7b44e07980eb7141ea.jpg",
//   "genres": "jajajaja",
//   "createdInDb": true 
// }

module.exports = rutaVideogame;