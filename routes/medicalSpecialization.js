const express = require('express');
const router = express.Router();
const MedicalSpecializationController = require('../controllers/medicalSpecialization');
const md_auth = require('../middlewares/authenticated');

const controller = new MedicalSpecializationController();

// Ruta para crear una especialización médica
router.post('/medical-specializations', md_auth.ensureAuth, controller.createMedicalSpecialization);

// Ruta para actualizar una especialización médica
router.put('/medical-specializations/:id', md_auth.ensureAuth, controller.updateMedicalSpecialization);

// Ruta para eliminar una especialización médica
router.delete('/medical-specializations/:id', md_auth.ensureAuth, controller.deleteMedicalSpecialization);

// Ruta para obtener una especialización médica por su ID
router.get('/medical-specializations/:id', md_auth.ensureAuth, controller.getMedicalSpecialization);

// Ruta para obtener todas las especializaciones médicas
router.get('/medical-specializations', md_auth.ensureAuth, controller.getMedicalSpecializations);

module.exports = router;
