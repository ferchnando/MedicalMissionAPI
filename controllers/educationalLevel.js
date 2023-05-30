const EducationalLevel = require('../models/educationalLevel');

class EducationalLevelController {
  // Crear un nivel educativo
  async createEducationalLevel(req, res) {
    try {
      const { name } = req.body;
      
      const educationalLevel = new EducationalLevel({ name });
      const savedEducationalLevel = await educationalLevel.save();
      
      res.status(201).json({ educationalLevel: savedEducationalLevel });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el nivel educativo', error });
    }
  }
  
  // Actualizar un nivel educativo
  async updateEducationalLevel(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      const updatedEducationalLevel = await EducationalLevel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      
      if (!updatedEducationalLevel) {
        return res.status(404).json({ message: 'No se encontró el nivel educativo' });
      }
      
      res.status(200).json({ educationalLevel: updatedEducationalLevel });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el nivel educativo', error });
    }
  }
  
  // Eliminar un nivel educativo
  async deleteEducationalLevel(req, res) {
    try {
      const { id } = req.params;
      
      const deletedEducationalLevel = await EducationalLevel.findByIdAndDelete(id);
      
      if (!deletedEducationalLevel) {
        return res.status(404).json({ message: 'No se encontró el nivel educativo' });
      }
      
      res.status(200).json({ educationalLevel: deletedEducationalLevel });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el nivel educativo', error });
    }
  }
  
  // Obtener un nivel educativo por su ID
  async getEducationalLevel(req, res) {
    try {
      const { id } = req.params;
      
      const educationalLevel = await EducationalLevel.findById(id);
      
      if (!educationalLevel) {
        return res.status(404).json({ message: 'No se encontró el nivel educativo' });
      }
      
      res.status(200).json({ educationalLevel });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el nivel educativo', error });
    }
  }
  
  // Obtener todos los niveles educativos
  async getEducationalLevels(req, res) {
    try {
      const educationalLevels = await EducationalLevel.find();
      
      res.status(200).json( educationalLevels );
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los niveles educativos', error });
    }
  }
}

module.exports = EducationalLevelController;
