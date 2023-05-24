const express = require('express');
const router = express.Router();
const CountryController = require('../controllers/country');
const md_auth = require('../middlewares/authenticated');

const countryController = new CountryController();

// Ruta para crear un país
router.post('/countries', md_auth.ensureAuth, countryController.createCountry);

// Ruta para actualizar un país
router.put('/countries/:id', md_auth.ensureAuth, countryController.updateCountry);

// Ruta para eliminar un país
router.delete('/countries/:id', md_auth.ensureAuth, countryController.deleteCountry);

// Ruta para obtener un país por su ID
router.get('/countries/:id', md_auth.ensureAuth, countryController.getCountry);

// Ruta para obtener todos los países
router.get('/countries', md_auth.ensureAuth, countryController.getCountries);

module.exports = router;
