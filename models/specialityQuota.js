const mongoose = require('mongoose');
const { Schema } = mongoose;
const Period = require('../models/period');

const specialityQuotaSchema = new Schema({
    period: {
        type: Schema.ObjectId,
        ref: 'Period',
        required: true
    },
    medicalSpecialization: {
        type: Schema.ObjectId,
        ref: 'MedicalSpecialization',
        required: true
    },
    attentionDate: {
        type: Date,
        required: true
    },
    maxQuota: {
        type: Number,
        required: true
    },
});

specialityQuotaSchema.index({ period: 1, medicalSpecialization: 1, attentionDate: 1 }, { unique: true });

specialityQuotaSchema.path('attentionDate').validate(async function (value) {
    
    try {
        const period = await Period.findById(this.period);
        if (!period) {
            throw new Error('The corresponding period was not found: ' + this.period);
        }
        // Verifica si la fecha está dentro del rango permitido
        return value >= period.startDate && value <= period.endDate;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
}, 'The date must be within the range of the period.');

module.exports = mongoose.model('SpecialityQuota', specialityQuotaSchema);
