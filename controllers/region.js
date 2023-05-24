const Region = require('../models/region');

class RegionController {
  async createRegion(req, res) {
    try {
      const { name, country } = req.body;
      const region = new Region({ name, country });
      const savedRegion = await region.save();
      res.status(201).json(savedRegion);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la región' });
    }
  }

  async updateRegion(req, res) {
    try {
      const { id } = req.params;
      const { name, country } = req.body;
      const updatedRegion = await Region.findByIdAndUpdate(id, { name, country }, { new: true });
      if (!updatedRegion) {
        return res.status(404).json({ error: 'Región no encontrada' });
      }
      res.json(updatedRegion);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la región' });
    }
  }

  async deleteRegion(req, res) {
    try {
      const { id } = req.params;
      const deletedRegion = await Region.findByIdAndRemove(id);
      if (!deletedRegion) {
        return res.status(404).json({ error: 'Región no encontrada' });
      }
      res.json(deletedRegion);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la región' });
    }
  }

  async getRegion(req, res) {
    try {
      const { id } = req.params;
      const region = await Region.findById(id);
      if (!region) {
        return res.status(404).json({ error: 'Región no encontrada' });
      }
      res.json(region);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la región' });
    }
  }

  async getRegions(req, res) {
    try {
      const regions = await Region.find();
      res.json(regions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las regiones' });
    }
  }
}

module.exports = RegionController;
