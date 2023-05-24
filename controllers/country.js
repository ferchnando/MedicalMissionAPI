const Country = require('../models/country');

class CountryController {
  async createCountry(req, res) {
    try {
      const { name } = req.body;
      const country = new Country({ name });
      const savedCountry = await country.save();
      res.status(201).json(savedCountry);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el país' });
    }
  }

  async updateCountry(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedCountry = await Country.findByIdAndUpdate(id, { name }, { new: true });
      if (!updatedCountry) {
        return res.status(404).json({ error: 'País no encontrado' });
      }
      res.json(updatedCountry);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el país' });
    }
  }

  async deleteCountry(req, res) {
    try {
      const { id } = req.params;
      const deletedCountry = await Country.findByIdAndDelete(id);
      if (!deletedCountry) {
        return res.status(404).json({ error: 'País no encontrado' });
      }
      res.json(deletedCountry);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el país' });
    }
  }

  async getCountry(req, res) {
    try {
      const { id } = req.params;
      const country = await Country.findById(id);
      if (!country) {
        return res.status(404).json({ error: 'País no encontrado' });
      }
      res.json(country);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el país' });
    }
  }

  async getCountries(req, res) {
    try {
      const countries = await Country.find();
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los paises' });
    }
  }
}

module.exports = CountryController;
