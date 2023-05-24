const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    idNumber: {                   //Número de carné
        type: Number,
        unique: true,
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

personSchema.index({ identification: 1 }, { unique: true });

personSchema.pre('save', async function (next) {
    try {
        const lastPerson = await mongoose.models['Person'].find().sort({ idNumber: -1 }).limit(1).exec();
        this.idNumber = lastPerson.length ? lastPerson[0].idNumber + 1 : 1;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Person', personSchema);