'use strict'

var Person = require('../models/person');

var mongoosePagination = require('../node_modules/mongoose-pagination')
var fs = require('fs');
var path = require('path');

function getPerson(req, res){
    var personId = req.params.id;

    Person.findById(personId, (err, personFound) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!personFound){
                res.status(404).send({message: 'Persona no existe'});
            }else{
                res.status(200).send({personFound});
            }
        }
    });
}

function getPersons(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    var itemsPerPage = 4;

    Person.find().sort('name').paginate(page, itemsPerPage, function(err, persons, totalItems){
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!persons){
                res.status(404).send({message: 'No existen personas en la base de datos'});
            }else{
                return res.status(200).send({
                    totalItems: totalItems,
                    persons: persons
                });
            }
        }
    })
}

function savePerson(req, res){
    var person = new Person();
    var params = req.body;

    person.bracelet = params.bracelet,
    person.identification = params.identification,
    person.firstname = params.firstname,
    person.paternallastname = params.paternallastname,
    person.maternallastname = params.maternallastname,
    person.birthdate = params.birthdate,
    person.maritalstatus = params.maritalstatus,
    person.phonenumber = params.phonenumber,
    person.image = null,

    person.save((err, personStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la persona'});
        }else{
            if(!personStored){
                res.status(404).send({message: 'No se pudo guardar la persona'});
            }else{
                res.status(200).send({person: personStored});
            }
        }
    })
}

function updatePerson(req, res){
    var personId = req.params.id;
    var update = req.body;

    Person.findByIdAndUpdate(personId, update, (err, personUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar la persona'});
        }else{
            if(!personUpdated){
                res.status(404).send({message: 'No se ha podido actualizar la persona'});
            }else{
                res.status(200).send({personUpdated});
            }
        }
    })
}

function deletePerson(req, res){
    var personId = req.params.id;
    
    Person.findByIdAndRemove(personId, (err, personRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error al eliminar la persona'});
        }else{
            //Delete person
            if(!personRemoved){
                res.status(404).send({message: 'No se ha podido eliminar la persona'});
            }else{
                res.status(200).send({personRemoved});
            }
            
        }
    });
}

function uploadImage(req, res){
    var personId = req.params.id;
    var filename = 'No subido...';

    if(req.files){
        var filepath = req.files.image.path;
        var filename = filepath.split('\\').pop().split('/').pop();

        var filenamesplit = filename.split('\.');
        var fileext = filenamesplit[1];
        
        if(fileext == 'png' || fileext == 'jpg' || fileext == 'gif'){
            Person.findByIdAndUpdate(personId, {image: filename}, (err, personUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error al actualizar la persona'});
                }else{
                    if(!personUpdated){
                        res.status(500).send({message: 'No se ha podido actualizar la persona'});
                    }else{
                        res.status(200).send({person: personUpdated});
                    }
                }
            })
        }else{
            res.status(200).send({message: 'Extensión del archivo no válida'});
        }
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var filePath = './uploads/persons/'+imageFile
    fs.exists(filePath, function(exists){
        if(exists){
            res.sendFile(path.resolve(filePath));
        }else{
            res.status(200).send({message: 'La imagen no existe'});
        }
    })
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