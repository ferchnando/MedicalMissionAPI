const mongoose = require('mongoose');
const common = require('../services/common');
const { Schema } = mongoose;

const personSchema = new Schema({
    idNumber: {                 //ID
        type: Number,
        default: 0
    },
    idCardNumber: {             //Número de carné
        type: String,
        unique: true,
        required: true,
        default: 0
    },
    identification: {           //Número de indentificación
        type: String,
        unique: true,
        required: true
    },
    firstname: String,          //Primer nombre
    secondname: String,         //Segundo nombre
    paternallastname: String,   //Apellido parterno
    maternalLastname: String,   //Apellido materno
    gender: {                   //Género
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    ethnicGroup: {              //Grupo étnico
        type: Schema.ObjectId,
        ref: 'EthnicGroup'
    },
    occupation: {               //Ocupación
        type: Schema.ObjectId,
        ref: 'Occupation'
    },
    birthdate: String,          //Fecha de nacimiento
    maritalStatus: {            //Estado civil
        type: String,
        enum: ['STATUS_SINGLE',         //Soltero
            'STATUS_MARRIED',           //Casado
            'STATUS_DIVORCIED',         //Divorciado
            'STATUS_WIDOWED',           //Viudo
            'STATUS_NON-MARITAL-UNION', //Unión de hecho
        ]
    },
    phonenumber: String,        //Número de teléfono
    address: {                  //Dirección
        type: Schema.ObjectId,
        ref: 'Address',
        required: true
    },
    educationalLevel: {         //Nivel de educación
        type: Schema.ObjectId,
        ref: 'EducationalLevel'
    },
    related: {                  //Persona relacionada
        type: Schema.ObjectId,
        ref: 'Person'
    },
    relationship: {             //relación
        type: Schema.ObjectId,
        ref: 'Relationship'
    },
    image: String               //imagen
});

personSchema.index({ idCardNumber: 1 }, { unique: true });

personSchema.pre('save', async function (next) {
    try {
        this.firstname = await common.capitalLetters(this.firstname);
        this.secondname = await common.capitalLetters(this.secondname);
        this.paternallastname = await common.capitalLetters(this.paternallastname);
        this.maternalLastname = await common.capitalLetters(this.maternalLastname);
        const result = await common.getNewPersonIdNumber(this.address);
        this.idNumber = result.idNumber;
        this.idCardNumber = result.idCardNumber;
        next();
    } catch (error) {
        next(error);
    }
});

personSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate();
        update.firstname = await common.capitalLetters(update.firstname);
        update.secondname = await common.capitalLetters(update.secondname);
        update.paternallastname = await common.capitalLetters(update.paternallastname);
        update.maternalLastname = await common.capitalLetters(update.maternalLastname);
        
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Person', personSchema);