const Address = require('../models/address');

class AddressController {
  async createAddress(req, res) {
    try {
      const addressData = req.body;
      const address = await Address.create(addressData);
      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAddress(req, res) {
    try {
      const addressId = req.params.id;
      const addressData = req.body;
      const address = await Address.findByIdAndUpdate(addressId, addressData, { new: true });
      if (!address) {
        return res.status(404).json({ error: 'Dirección no encontrada' });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAddress(req, res) {
    try {
      const addressId = req.params.id;
      const address = await Address.findByIdAndRemove(addressId);
      if (!address) {
        return res.status(404).json({ error: 'Dirección no encontrada' });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAddress(req, res) {
    try {
      const addressId = req.params.id;
      const address = await Address.findById(addressId);
      if (!address) {
        return res.status(404).json({ error: 'Dirección no encontrada' });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAddresses(req, res) {
    try {
      const addresses = await Address.find();
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AddressController;
