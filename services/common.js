const Address = require('../models/address');
const Region = require('../models/region');

exports.getNewPersonIdNumber = async function getNewPersonIdNumber(newPersonId, personAddress) {
    const address = await getAdress(personAddress);
    if (!address) {
        return "";
    }
    
    const region = await getRegion(address.region);
    if (!region) {
        return "";
    }
    
    return region.idNumber + newPersonId.toString().padStart(6, '0');
};

function getRegion(regionId) {
    return new Promise((resolve, reject) => {
        Region.findById(regionId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getAdress(addressId) {
    return new Promise((resolve, reject) => {
        Address.findById(addressId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    });
}

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