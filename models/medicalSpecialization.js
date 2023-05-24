const mongoose = require('mongoose');
const common = require('../services/common');
const { Schema } = mongoose;

const medicalSpecializationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

medicalSpecializationSchema.index({ name: 1 }, { unique: true });

medicalSpecializationSchema.pre('save', async function (next) {
    try {
        this.name = await common.capitalLetters(this.name);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('MedicalSpecialization', medicalSpecializationSchema);
