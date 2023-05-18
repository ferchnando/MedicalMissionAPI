'use strict'

var mongoose = require('../node_modules/mongoose');
var schema = mongoose.Schema;

var userSchema = schema({
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

module.exports = mongoose.model('User', userSchema);