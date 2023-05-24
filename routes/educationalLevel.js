const express = require('express');
const router = express.Router();
const EducationalLevelController = require('../controllers/educationalLevel');
const md_auth = require('../middlewares/authenticated');

const controller = new EducationalLevelController();

// Ruta para crear un nivel educativo
router.post('/educational-levels', md_auth.ensureAuth, controller.createEducationalLevel);

// Ruta para actualizar un nivel educativo
router.put('/educational-levels/:id', md_auth.ensureAuth, controller.updateEducationalLevel);

// Ruta para eliminar un nivel educativo
router.delete('/educational-levels/:id', md_auth.ensureAuth, controller.deleteEducationalLevel);

// Ruta para obtener un nivel educativo por su ID
router.get('/educational-levels/:id', md_auth.ensureAuth, controller.getEducationalLevel);

// Ruta para obtener todos los niveles educativos
router.get('/educational-levels', md_auth.ensureAuth, controller.getEducationalLevels);

module.exports = router;
