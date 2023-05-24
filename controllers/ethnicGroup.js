const EthnicGroup = require('../models/ethnicGroup');

class EthnicGroupController {
  // Crear un grupo étnico
  async createEthnicGroup(req, res) {
    try {
      const { name } = req.body;
      const ethnicGroup = new EthnicGroup({ name });
      const savedEthnicGroup = await ethnicGroup.save();
      res.status(201).json(savedEthnicGroup);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el grupo étnico', error });
    }
  }

  // Actualizar un grupo étnico
  async updateEthnicGroup(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedEthnicGroup = await EthnicGroup.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!updatedEthnicGroup) {
        return res.status(404).json({ message: 'Grupo étnico no encontrado' });
      }
      res.json(updatedEthnicGroup);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el grupo étnico', error });
    }
  }

  // Eliminar un grupo étnico
  async deleteEthnicGroup(req, res) {
    try {
      const { id } = req.params;
      const deletedEthnicGroup = await EthnicGroup.findByIdAndDelete(id);
      if (!deletedEthnicGroup) {
        return res.status(404).json({ message: 'Grupo étnico no encontrado' });
      }
      res.json({ message: 'Grupo étnico eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el grupo étnico', error });
    }
  }

  // Obtener un grupo étnico por su ID
  async getEthnicGroup(req, res) {
    try {
      const { id } = req.params;
      const ethnicGroup = await EthnicGroup.findById(id);
      if (!ethnicGroup) {
        return res.status(404).json({ message: 'Grupo étnico no encontrado' });
      }
      res.json(ethnicGroup);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el grupo étnico', error });
    }
  }

  // Obtener todos los grupos étnicos
  async getEthnicGroups(req, res) {
    try {
      const ethnicGroups = await EthnicGroup.find();
      res.json(ethnicGroups);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los grupos étnicos', error });
    }
  }
}

module.exports = EthnicGroupController;
