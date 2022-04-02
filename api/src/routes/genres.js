// - [ ] _GET /genres_:
//   - Obtener todos los tipos de gÃ©neros de videojuegos posibles
//   - En una primera instancia deberÃ¡n traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allÃ­

const axios = require("axios");
const { Router } = require("express");
const rutaGenres = Router();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

rutaGenres.get("/", async (req, res) => {
  const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}` );
  const genres = genresApi.data.results.map((e) => e.name);
  // console.log(genres, "Soy genres");

  genres.forEach((e) => {
    Genres.findOrCreate({ // porque no hay un await adelante Genre
      where: { name: e}, // o genres
       //attributes: ["id"]
    });
  });
//
  //  const allGenres = await Genres.findAll();
  //  res.status(200).json(allGenres);

  return await Genres.findAll()

    .then((resBD) => {
      res.status(200).json(resBD);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = rutaGenres;