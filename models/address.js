const mongoose = require('mongoose');
const common = require('../services/common');
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

addressSchema.index({ mainStreet: 1, numbering: 1, reference: 1, city: 1, district: 1, region: 1,}, { unique: true });

addressSchema.pre('save', async function (next) {
  try {
      this.mainStreet = await common.capitalLetters(this.mainStreet);
      this.intersection = await common.capitalLetters(this.intersection);
      this.reference = await common.capitalLetters(this.reference);
      this.numbering = await common.upperCaseLetters(this.numbering);
      this.postalCode = await common.upperCaseLetters(this.postalCode);
      next();
  } catch (error) {
      next(error);
  }
});

module.exports = mongoose.model('Address', addressSchema);