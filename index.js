'use strict'

const express = require('express');
const config = require('./config');

const app = config(express());

// Conectar a la base de datos de MongoDB
require('./database');

// Init server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})