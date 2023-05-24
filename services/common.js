const Address = require('../models/address');
const Region = require('../models/region');

exports.getNewPersonIdNumber = function getNewPersonIdNumber(newPersonId, personAddress) {
    //const address = Address.findById(personAddress._id);
    //console.log(address);
    /*try {
        const docs = Address.find({ personAddress }).populate('_id');
        console.log("Result:", docs);
      } catch (err) {
        console.log(err);
      }*/
    /*console.log(personAddress._id);
    if (!address) {
        return '';
    }
    const region = Region.findById(address.region._id);
    console.log(address._id);
    if (!region) {
        return '';
    }
    console.log(region.idNumber);*/
    return /*region.idNumber +*/ newPersonId.toString().padStart(5, '0');
    //return '';
};

exports.capitalLetters = function capitalLetters(str) {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = capitalString(arr[i]);
    }

    return arr.join(" ");
};

exports.lowerCaseLetters = function lowerCaseLetters(str) {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toLowerCase();
    }

    return arr.join(" ");
};

exports.upperCaseLetters = function upperCaseLetters(str) {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toUpperCase();
    }

    return arr.join(" ");
};

function capitalString(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};