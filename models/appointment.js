const mongoose = require('mongoose');
const { Schema } = mongoose;
const currentDate = new Date();

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
    attentionDate: {
        type: Date,
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

appointmentSchema.pre('save', async function (next) {
    try {
        switch (this.status) {
            case 'STATUS_ON-HOLD':
                this.onHoldUpdate = currentDate;
                break;
            case 'STATUS_ARCHIVED':
                this.archivedUpdate = currentDate;
                break;
            case 'STATUS_ATTENDED':
                this.attendedUpdate = currentDate;
                break;
            case 'STATUS_NOT-ATTENDED':
                this.notAttendedUpdate = currentDate;
                break;
        }

        const lastAppointment = await mongoose.models['Appointment'].find({ period: this.period }).sort({ number: -1 }).limit(1).exec();
        this.number = lastAppointment.length ? lastAppointment[0].number + 1 : 1;
        next();
    } catch (error) {
        next(error);
    }
});

appointmentSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate();
        switch (update.status) {
            case 'STATUS_ON-HOLD':
                update.onHoldUpdate = currentDate;
                break;
            case 'STATUS_ARCHIVED':
                update.archivedUpdate = currentDate;
                break;
            case 'STATUS_ATTENDED':
                update.attendedUpdate = currentDate;
                break;
            case 'STATUS_NOT-ATTENDED':
                update.notAttendedUpdate = currentDate;
                break;
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);