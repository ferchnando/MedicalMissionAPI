const express = require('express');
const router = express.Router();
const OccupationController = require('../controllers/occupation');
const md_auth = require('../middlewares/authenticated');

const occupationController = new OccupationController();

// Ruta para crear una ocupación
router.post('/occupations', md_auth.ensureAuth, occupationController.createOccupation);

// Ruta para actualizar una ocupación
router.put('/occupations/:id', md_auth.ensureAuth, occupationController.updateOccupation);

// Ruta para eliminar una ocupación
router.delete('/occupations/:id', md_auth.ensureAuth, occupationController.deleteOccupation);

// Ruta para obtener una ocupación por su ID
router.get('/occupations/:id', md_auth.ensureAuth, occupationController.getOccupation);

// Ruta para obtener todas las ocupaciones
router.get('/occupations', md_auth.ensureAuth, occupationController.getOccupations);

module.exports = router;
