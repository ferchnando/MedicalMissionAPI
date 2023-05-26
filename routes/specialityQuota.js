const express = require('express');
const router = express.Router();
const SpecialityQuotaController = require('../controllers/specialityQuota');
const md_auth = require('../middlewares/authenticated');

const specialityQuotaController = new SpecialityQuotaController();

// Ruta para crear una nueva SpecialityQuota
router.post('/specialityQuotas', md_auth.ensureAuth, specialityQuotaController.createSpecialityQuota);

// Ruta para actualizar una SpecialityQuota existente
router.put('/specialityQuotas/:id', md_auth.ensureAuth, specialityQuotaController.updateSpecialityQuota);

// Ruta para eliminar una SpecialityQuota existente
router.delete('/specialityQuotas/:id', md_auth.ensureAuth, specialityQuotaController.deleteSpecialityQuota);

// Ruta para obtener información de una SpecialityQuota específica
router.get('/specialityQuotas/:id', md_auth.ensureAuth, specialityQuotaController.getSpecialityQuota);

// Ruta para obtener todas las SpecialityQuotas
router.get('/specialityQuotas', md_auth.ensureAuth, specialityQuotaController.getSpecialityQuotas);

module.exports = router;
