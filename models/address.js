const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    mainStreet: {
        type: String,
        required: true
      },
    numbering: String,
    intersection: String,
    reference: String,
    postalCode: String,
    city: {
        type: String,
        required: true
      },
    district: {
        type: String,
        required: true
      },
    region: {
        type: Schema.ObjectId,
        ref: 'Region',
        required: true
      }
});

module.exports = mongoose.model('Address', addressSchema);