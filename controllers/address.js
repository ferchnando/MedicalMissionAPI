const Address = require('../models/address');
const Country = require('../models/country');
const Region = require('../models/region');

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

  async getAddressesByParams(req, res) {
    const addressParams = req.body;
    console.log(addressParams);
    try {
      let country, regions, addresses;

      if (addressParams.country) {
        //Consulta por modelo Country
        country = await Country.findById(addressParams.country);
      }

      if (addressParams.region) {
        if (country) {
          //Consulta por modelo Region relacionando region.country con country._id y id con addressParams.region
          regions = await Region.find({ _id: addressParams.region, country: { $in: country } });
        } else {
          //Consulta por modelo Region
          regions = await Region.findById(addressParams.region);
        }
      } else {
        if (country) {
          //Consulta por modelo Region por el campo region.country con country._id
          regions = await Region.find({ country: { $in: country } });
        }
      }

      if (addressParams.region || addressParams.country) {
        if (addressParams.address) {
          addresses = await Address.find({ region: { $in: regions }, _id: addressParams.address });
        } else {
          addresses = await Address.find({ region: { $in: regions } });
        }
      } else {
        if (addressParams.address) {
          //Consulta por modelo Address
          addresses = await Address.findById(addressParams.address);
        } else {
          //Consulta todos los registros del modelo Address
          addresses = await Address.find();
        }
      }
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AddressController;
