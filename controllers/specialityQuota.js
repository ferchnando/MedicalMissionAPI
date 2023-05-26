const SpecialityQuota = require('../models/specialityQuota');

class SpecialityQuotaController {
    async createSpecialityQuota(req, res) {
        try {
            const { period, medicalSpecialization, maxQuota } = req.body;

            const specialityQuota = await SpecialityQuota.create({
                period,
                medicalSpecialization,
                maxQuota,
            });

            res.status(201).json(specialityQuota);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la cuota de especialidad' });
        }
    }

    async updateSpecialityQuota(req, res) {
        try {
            const { id } = req.params;
            const { period, medicalSpecialization, maxQuota } = req.body;

            const specialityQuota = await SpecialityQuota.findByIdAndUpdate(
                id,
                { period, medicalSpecialization, maxQuota },
                { new: true }
            );

            if (!specialityQuota) {
                return res.status(404).json({ error: 'Cuota de especialidad no encontrada' });
            }

            res.json(specialityQuota);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la cuota de especialidad' });
        }
    }

    async deleteSpecialityQuota(req, res) {
        try {
            const { id } = req.params;

            const specialityQuota = await SpecialityQuota.findByIdAndDelete(id);

            if (!specialityQuota) {
                return res.status(404).json({ error: 'Cuota de especialidad no encontrada' });
            }

            res.json({ message: 'Cuota de especialidad eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la cuota de especialidad' });
        }
    }

    async getSpecialityQuota(req, res) {
        try {
            const { id } = req.params;

            const specialityQuota = await SpecialityQuota.findById(id);

            if (!specialityQuota) {
                return res.status(404).json({ error: 'Cuota de especialidad no encontrada' });
            }

            res.json(specialityQuota);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la cuota de especialidad' });
        }
    }

    async getSpecialityQuotas(req, res) {
        try {
            const specialityQuotas = await SpecialityQuota.find();

            res.json(specialityQuotas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las cuotas de especialidad' });
        }
    }
}

module.exports = SpecialityQuotaController;
