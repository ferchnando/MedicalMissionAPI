const mongoose = require('mongoose');
const common = require('../services/common');
const { Schema } = mongoose;

const educationalLevelSchema = new Schema({
    name: {
        type: String,
        required: true
      },
});

educationalLevelSchema.index({ name: 1 }, { unique: true });

educationalLevelSchema.pre('save', async function (next) {
  try {
      this.name = await common.capitalLetters(this.name);
      next();
  } catch (error) {
      next(error);
  }
});

module.exports = mongoose.model('EducationalLevel', educationalLevelSchema);