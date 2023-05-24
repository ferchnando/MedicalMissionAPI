const Occupation = require('../models/occupation');

class OccupationController {
  // Crear una ocupación
  async createOccupation(req, res) {
    try {
      const { name } = req.body;
      const occupation = new Occupation({ name });
      const savedOccupation = await occupation.save();
      res.status(201).json(savedOccupation);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la ocupación', error });
    }
  }

  // Actualizar una ocupación
  async updateOccupation(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedOccupation = await Occupation.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!updatedOccupation) {
        return res.status(404).json({ message: 'Ocupación no encontrada' });
      }
      res.json(updatedOccupation);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la ocupación', error });
    }
  }

  // Eliminar una ocupación
  async deleteOccupation(req, res) {
    try {
      const { id } = req.params;
      const deletedOccupation = await Occupation.findByIdAndDelete(id);
      if (!deletedOccupation) {
        return res.status(404).json({ message: 'Ocupación no encontrada' });
      }
      res.json({ message: 'Ocupación eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la ocupación', error });
    }
  }

  // Obtener una ocupación por su ID
  async getOccupation(req, res) {
    try {
      const { id } = req.params;
      const occupation = await Occupation.findById(id);
      if (!occupation) {
        return res.status(404).json({ message: 'Ocupación no encontrada' });
      }
      res.json(occupation);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la ocupación', error });
    }
  }

  // Obtener todas las ocupaciones
  async getOccupations(req, res) {
    try {
      const occupations = await Occupation.find();
      res.json(occupations);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las ocupaciones', error });
    }
  }
}

module.exports = OccupationController;
