const express = require('express');
const router = express.Router();
const EthnicGroupController = require('../controllers/ethnicGroup');
const md_auth = require('../middlewares/authenticated');

const controller = new EthnicGroupController();

// Ruta para crear un grupo étnico
router.post('/ethnic-groups', md_auth.ensureAuth, controller.createEthnicGroup);

// Ruta para actualizar un grupo étnico
router.put('/ethnic-groups/:id', md_auth.ensureAuth, controller.updateEthnicGroup);

// Ruta para eliminar un grupo étnico
router.delete('/ethnic-groups/:id', md_auth.ensureAuth, controller.deleteEthnicGroup);

// Ruta para obtener un grupo étnico por su ID
router.get('/ethnic-groups/:id', md_auth.ensureAuth, controller.getEthnicGroup);

// Ruta para obtener todos los grupos étnicos
router.get('/ethnic-groups', md_auth.ensureAuth, controller.getEthnicGroups);

module.exports = router;
