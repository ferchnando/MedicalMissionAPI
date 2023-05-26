const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersAllocationSchema = new Schema({
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
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
});

usersAllocationSchema.index({ period: 1, medicalSpecialization: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('UsersAllocation', usersAllocationSchema);
