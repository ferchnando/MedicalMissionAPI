const express = require('express');
const router = express.Router();
const md_auth = require('../middlewares/authenticated');

const RegionController = require('../controllers/region');

const regionController = new RegionController();

// Ruta para crear una región
router.post('/regions', md_auth.ensureAuth, regionController.createRegion);

// Ruta para actualizar una región
router.put('/regions/:id', md_auth.ensureAuth, regionController.updateRegion);

// Ruta para eliminar una región
router.delete('/regions/:id', md_auth.ensureAuth, regionController.deleteRegion);

// Ruta para obtener los detalles de una región
router.get('/regions/:id', md_auth.ensureAuth, regionController.getRegion);

// Ruta para obtener todas las regiones
router.get('/regions', md_auth.ensureAuth, regionController.getRegions);

module.exports = router;
