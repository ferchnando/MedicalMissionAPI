'use strict'

var mongoose = require('../node_modules/mongoose');
var schema = mongoose.Schema;

var personSchema = schema({
    bracelet: String,
    identification: String,
    firstname: String,
    paternallastname: String,
    maternallastname: String,
    birthdate: String,
    maritalstatus: String,
    phonenumber: String,
    image: String
});

module.exports = mongoose.model('Person', personSchema);