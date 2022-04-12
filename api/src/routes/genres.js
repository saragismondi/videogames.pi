const axios = require("axios");
const { Router } = require("express");
const rutaGenres = Router();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

rutaGenres.get("/", async (req, res) => {
  const genresApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genres = genresApi.data.results.map((e) => e.name);
  // console.log(genres, "Soy genres");
  genres.forEach((e) => {
    Genres.findOrCreate({// los generos LIMPIOS con el id de la db 
      where: { name: e },
    });
  });
  return Genres.findAll() 
    .then((resBD) => {
      res.status(200).json(resBD);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});
module.exports = rutaGenres;
