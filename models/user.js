const mongoose = require('mongoose');
const common = require('../services/common');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ROLE_USER', 'ROLE_ADMIN'],
        default: 'ROLE_USER'
    },
    image: {
        type: String
    }
});

userSchema.pre('save', async function (next) {
    try {
        this.name = await common.capitalLetters(this.name);
        this.surname = await common.capitalLetters(this.surname);
        this.email = await common.lowerCaseLetters(this.email);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate();
        update.name = await common.capitalLetters(update.name);
        update.surname = await common.capitalLetters(update.surname);
        update.email = await common.lowerCaseLetters(update.email);
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('User', userSchema);