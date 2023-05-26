const express = require('express');
const router = express.Router();
const PeriodController = require('../controllers/period');
const md_auth = require('../middlewares/authenticated');

const periodController = new PeriodController();

// Ruta para crear un periodo
router.post('/periods', md_auth.ensureAuth, periodController.createPeriod);

// Ruta para actualizar un periodo
router.put('/periods/:id', md_auth.ensureAuth, periodController.updatePeriod);

// Ruta para eliminar un periodo
router.delete('/periods/:id', md_auth.ensureAuth, periodController.deletePeriod);

// Ruta para obtener un periodo por su ID
router.get('/periods/:id', md_auth.ensureAuth, periodController.getPeriod);

// Ruta para obtener todos los periodos
router.get('/periods', md_auth.ensureAuth, periodController.getPeriods);

module.exports = router;
