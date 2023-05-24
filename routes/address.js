const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address');
const md_auth = require('../middlewares/authenticated');

const addressController = new AddressController();

// Ruta para crear una dirección
router.post('/addresses', md_auth.ensureAuth, addressController.createAddress);

// Ruta para actualizar una dirección
router.put('/addresses/:id', md_auth.ensureAuth, addressController.updateAddress);

// Ruta para eliminar una dirección
router.delete('/addresses/:id', md_auth.ensureAuth, addressController.deleteAddress);

// Ruta para obtener una dirección por su ID
router.get('/addresses/:id', md_auth.ensureAuth, addressController.getAddress);

// Ruta para obtener todas las direcciones
router.get('/addresses', md_auth.ensureAuth, addressController.getAddresses);

module.exports = router;
