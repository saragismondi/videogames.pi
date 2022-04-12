const { Router } = require("express");
const axios = require("axios");
const rutaVideogame = Router();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

const apiId = async (id) => {
  try {
    const idApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const idApiData = await idApi.data;
    const idDataLimpia = {
      id: idApiData.id,
      image: idApiData.background_image,
      name: idApiData.name,
      description: idApiData.description,
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
const dbId = async (id) => {
  try {
    const dbGame = await Videogame.findByPk(id, { include: Genres });
    return {
      id: dbGame.id,
      image: dbGame.background_image,
      name: dbGame.name,
      description: dbGame.description,
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
  const uuId = id.includes("-");
  if (uuId) {
    const dbIdInfo = await dbId(id);
    return dbIdInfo;
  } else {
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

// POST
rutaVideogame.post("/", async (req, res) => {
  const { name, description, released, rating, genres, platforms } = req.body;
  // console.log(req.body);
  const videogameCreated = await Videogame.create({ 
    name,
    description,
    released,
    rating,
    genres,
    platforms,
  });
  let genreDb = await Genres.findAll({
    where: {
      name: genres,
    },
  });
  await videogameCreated.addGenres(genreDb);
  res.send("Juego Creado");
});
//DELETE

// router.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (id) {
//       await Pokemon.destroy({
//         where: { id: id },
//       });
//     }
//     return res.send({ msg: 'Pokemon deleted' });
//   } catch (error) {
//     console.log(error)
//   }
// });
//PUT 
// async function updateUser(req, res) {
//   try { 
// const id = req.params.id 
// const {admin, active} = req.body 
// console.log(admin, active) 
//  const user = await User.findByPk(id) 
    
// if(admin !== undefined){user.admin=admin} 
// if(active !== undefined){user.active=active} 
// await user.save(); res.json(user); 
// } catch (err) 
// { console.log(err); 
//res.status(500).json(err); 
//}}

module.exports = rutaVideogame;
