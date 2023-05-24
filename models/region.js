const mongoose = require('mongoose');
const { Schema } = mongoose;

const regionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: Schema.ObjectId,
    ref: 'Country',
    required: true
  }
});

regionSchema.index({ name: 1, country: 1 }, { unique: true });

module.exports = mongoose.model('Region', regionSchema);
