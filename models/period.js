const mongoose = require('mongoose');
const { Schema } = mongoose;

const periodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
});

periodSchema.index({ name: 1, year: 1, startDate: 1, endDate: 1 }, { unique: true });

module.exports = mongoose.model('Period', periodSchema);
