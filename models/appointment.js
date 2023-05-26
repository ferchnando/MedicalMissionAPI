const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    period: {
        type: Schema.ObjectId,
        ref: 'Period',
        required: true
    },
    medicalSpecialization: {
        type: Schema.ObjectId,
        ref: 'MedicalSpecialization',
        required: true
    },
    person: {
        type: Schema.ObjectId,
        ref: 'Person',
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    status: {                           //Estado de la cita
        type: String,
        enum: ['STATUS_ON-HOLD',        //En cola
            'STATUS_ARCHIVED',          //Archivado
            'STATUS_ATTENDED',          //Atendido
            'STATUS_NOT-ATTENDED',      //Sin atenderse
        ]
    },
    onHoldUpdate: {
        type: Date
    },
    archivedUpdate: {
        type: Date
    },
    attendedUpdate: {
        type: Date
    },
    notAttendedUpdate: {
        type: Date
    }
});

appointmentSchema.index({ period: 1, medicalSpecialization: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);