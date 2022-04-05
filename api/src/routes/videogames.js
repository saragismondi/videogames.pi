//- [ ] _GET /videogames_:
// - Obtener un listado de los videojuegos
// - Debe devolver solo los datos necesarios para la ruta principal

const axios = require("axios");
const { Router } = require("express");
const rutaJuegos = Router();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

//const juegosApi = [];

const listadoJuegosApi = async () => {
  // esta funcion me va a traer la informacion de la APi

  try {
    // const paginaApiUno = await axios.get(
    //   `https://api.rawg.io/api/games?key=${API_KEY}&page=25&page_size=4`
    // );
    // const paginaApiDos = await axios.get(
    //   `https://api.rawg.io/api/games?key=${API_KEY}&page=12&page_size=4`
    // );
    // const paginaApiTres = await axios.get(
    //   `https://api.rawg.io/api/games?key=${API_KEY}&page=38&page_size=2`
    // );

    // const resultadoPaginas = [
    //   ...paginaApiUno.data.results,
    //   ...paginaApiDos.data.results,
    //   ...paginaApiTres.data.results,
    // ];
    // resultadoPaginas.forEach((et) => {
    //   juegosApi.push({
    //     id: et.id,
    //     name: et.name,
    //     released: et.released,
    //     image: et.background_image,
    //     rating: et.rating,
    //     platforms: et.platforms?.map(e => e.platform.name),
    //     genres: et.genres?.map(e => e.name)
        
    //   });
    // });
    const games = []
    for( var i = 1; i <= 10; i++){
       const game = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=1&page=${i}`);
       games.push({
        id: game.data.results[0].id,
        name: game.data.results[0].name,
        released: game.data.results[0].released,
        image: game.data.results[0].background_image,
        rating: game.data.results[0].rating,
        platforms: game.data.results[0].platforms?.map(e => e.platform.name),
        genres: game.data.results[0].genres?.map(e => e.name)
        })
        //console.log(game.data.results[0].id, "soy game")
      }
      // for( var i = 51; i <= 100; i++){
      //   const game = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=1&page=${i}`);
      //   games.push({
      //    id: game.data.results[0].id,
      //    name: game.data.results[0].name,
      //    released: game.data.results[0].released,
      //    image: game.data.results[0].background_image,
      //    rating: game.data.results[0].rating,
      //    platforms: game.data.results[0].platforms?.map(e => e.platform.name),
      //    genres: game.data.results[0].genres?.map(e => e.name)
      //    })
      //    //console.log(game.data.results[0].id, "soy game")
      //  }
      //console.log(games.length)
    return games; // retorne el array //juegos = [ {juego1}, {juego2} ---> {juego120} ]
  } catch (error) {
    // si hay un error, me retiorne el erro que existe
    return error;
  }
};

// esta funcion me va a traer la informacion de la base de datos, queir que me traigas el modelo de Generes, y sus atributos mediante el nombre, qeu atributo quiero que me traiga de esta llamada

const infoJuegosBd = async () => {
  try {
    var db = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return db;
  } catch (error) {
    // si hay un error, me retiorne el erro que existe
    return error;
  }
};

const getAllGames = async () => {
  const apiInfo = await listadoJuegosApi();
  const dbInfo = await infoJuegosBd();
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};

// ruta por quewry, busco por nombre

rutaJuegos.get("/", async (req, res) => {
  const name = req.query.name;
  let videogameTotal = await getAllGames();
  if (name) {
    let videogameName = await videogameTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    ); // p<ra cada elemento , pasalo a minuscula y agarrame cada  elemento de videogames y me incluye el nombre
    videogameName.length
      ? res.status(200).send(videogameName) //.slice(0,15) // para que me traiga los primeros 15
      : res.status(404).send("No esta el nombre, sigue participando");
  } else {
    res.status(200).send(videogameTotal);
  }
});
 // esto se puede hacer con el endpoint pero lo hice asi porque asi lo entiendo ---> la ruta por NAME 
//tengo que mejorar esta ruta para que se insensibilice la busqueda con el ilike
//no olvidar importar el {Op} 

// por query el plataforms  y un .filter .. agregar a un arreglo 
 ///la igual que genres, le haces un findall  y un where. [plat forms]: platforms y un Op.ilike 

rutaJuegos.get("/platforms", async (req, res) => {

  const juegos = await listadoJuegosApi();
  
  const allPlatforms = [];
  juegos.map(game => {
      game.platforms.map(platform => {
          if (!allPlatforms.includes(platform)) {
              allPlatforms.push(platform)
              console.log(allPlatforms, "HOLA SOY LAS PLATAFORMAS")
          }
         
      })
  })
  allPlatforms.length
      ? res.status(200).json({allPlatforms}) // no sabia que iba con llaves 
      : res.status(404).send('Error')
}
);

// const otraFuncion = async () => {
// console.log( await listadoJuegosApi(), "SOY EL LISTADO DE JUEGOS DE LA API")
// }
// otraFuncion()


//ME VIENEN LOS GENEROS DENTRO DE UN ARRAY DE OBJETOS ....> OJO !
// LA DESCRIPTION NO ESTA VINIENDO : DICE UNDEFINED 

// rutaJuegos.get("/platforms", async (req, res) => {
//   try {
//     const all = await listadoJuegosApi();
//     const allPlatforms = [];
//     all.map((g) =>
//       g.platform.map((p) => {
//         if (!allPlatforms.includes(p)) {
//           allPlatforms.push(p);
//         }
//       }));
//       allPlatforms.length ?
//       res.status(200).json(allPlatforms) :
//       res.status(404).send("error")
//   } catch (error) {
//     return error;
//   }
// });

module.exports = rutaJuegos;
