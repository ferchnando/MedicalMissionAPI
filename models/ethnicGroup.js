const mongoose = require('mongoose');
const { Schema } = mongoose;

const ethnicGroupSchema = new Schema({
    name: {
        type: String,
        required: true
      },
});

module.exports = mongoose.model('EthnicGroup', ethnicGroupSchema);