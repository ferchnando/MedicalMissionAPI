const mongoose = require('mongoose');
const common = require('../services/common');
const { Schema } = mongoose;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
});

countrySchema.index({ name: 1 }, { unique: true });

countrySchema.pre('save', async function (next) {
  try {
      this.name = await common.capitalLetters(this.name);
      next();
  } catch (error) {
      next(error);
  }
});

module.exports = mongoose.model('Country', countrySchema);