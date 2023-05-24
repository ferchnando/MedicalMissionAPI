const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    maxQuota: {
        type: Number,
        required: true
    },
});

specialityQuotaSchema.index({ period: 1, medicalSpecialization: 1 }, { unique: true });

module.exports = mongoose.model('SpecialityQuota', specialityQuotaSchema);
