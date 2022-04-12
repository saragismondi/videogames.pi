const { Router } = require('express');

const rutaJuegos = require ('./videogames');
const rutaGenres = require ('./genres');
const rutaVideogame = require ('./videogame');

const router = Router();

router.use("/videogames", rutaJuegos); 
router.use("/genres", rutaGenres);
router.use("/videogame", rutaVideogame);
router.use("/videogames/platforms", rutaJuegos)

module.exports = router;