const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js'); 

const rutaJuegos = require ('./videogames');
const rutaGenres = require ('./genres');
const rutaVideogame = require ('./videogame');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", rutaJuegos); // yo necesito que uses la funcion exportada de videogames = rutisima
router.use("/genres", rutaGenres);
router.use("/videogame", rutaVideogame);
router.use("/videogames/platforms", rutaJuegos)

module.exports = router;