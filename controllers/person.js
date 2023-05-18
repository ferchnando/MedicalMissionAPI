'use strict'

const Person = require('../models/person');

const mongoosePagination = require('../node_modules/mongoose-pagination')
const fs = require('fs');
const path = require('path');

async function getPerson(req, res) {
    try {
        const personId = req.params.id;

        const personFound = await Person.findById(personId).exec();
        if (!personFound) {
            return res.status(404).send({ message: 'Persona no existe' });
        }

        return res.status(200).send({ personFound });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error en la petición' });
    }
}

async function getPersons(req, res) {
    try {
        const page = req.params.page ? req.params.page : 1;
        const itemsPerPage = 4;

        const totalItems = await Person.countDocuments();

        const result = await Person.find()
            .sort('paternallastname')
            .paginate(page, itemsPerPage)
            .exec();

        if (!result) {
            return res.status(404).send({ message: 'No existen personas en la base de datos' });
        }

        return res.status(200).send({
            totalItems: totalItems,
            persons: result
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error en la petición' });
    }
}

async function savePerson(req, res) {
    try {
        const params = req.body;

        const person = new Person({
            bracelet: params.bracelet,
            identification: params.identification,
            firstname: params.firstname,
            secondname: params.secondname,
            paternallastname: params.paternallastname,
            maternallastname: params.maternallastname,
            birthdate: params.birthdate,
            maritalstatus: params.maritalstatus,
            phonenumber: params.phonenumber,
            image: null,
        });

        const personStored = await person.save();
        if (!personStored) {
            return res.status(404).send({ message: 'No se pudo guardar la persona' });
        }

        return res.status(200).send({ person: personStored });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al guardar la persona' });
    }
}

async function updatePerson(req, res) {
    try {
        const personId = req.params.id;
        const update = req.body;

        const personUpdated = await Person.findByIdAndUpdate(personId, update, { new: true });

        if (!personUpdated) {
            return res.status(404).send({ message: 'No se ha podido actualizar la persona' });
        }

        return res.status(200).send({ personUpdated });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar la persona' });
    }
}

async function deletePerson(req, res) {
    try {
        const personId = req.params.id;

        const personRemoved = await Person.findByIdAndRemove(personId);

        if (!personRemoved) {
            return res.status(404).send({ message: 'No se ha podido eliminar la persona' });
        }

        return res.status(200).send({ personRemoved });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al eliminar la persona' });
    }
}

async function uploadImage(req, res) {
    try {
        const personId = req.params.id;
        let filename = 'No subido...';

        if (!req.files) {
            return res.status(200).send({ message: 'No ha subido ninguna imagen' });
        }

        const filepath = req.files.image.path;
        filename = filepath.split(/[\\/]/).pop();

        const filenamesplit = filename.split('.');
        const fileext = filenamesplit[1];

        if (fileext !== 'png' && fileext !== 'jpg' && fileext !== 'gif') {
            return res.status(200).send({ message: 'Extensión del archivo no válida' });
        }

        const personUpdated = await Person.findByIdAndUpdate(personId, { image: filename }, { new: true });

        if (!personUpdated) {
            return res.status(500).send({ message: 'No se ha podido actualizar la persona' });
        }

        return res.status(200).send({ person: personUpdated });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al actualizar la persona' });
    }
}

function getImageFile(req, res) {
    const imageFile = req.params.imageFile;
    const filePath = path.resolve('./uploads/persons/', imageFile);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(200).send({ message: 'La imagen no existe' });
        }

        res.sendFile(filePath);
    });
}

module.exports = {
    getPerson,
    savePerson,
    getPersons,
    updatePerson,
    deletePerson,
    uploadImage,
    getImageFile
}