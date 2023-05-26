const router = require('express').Router();
const user_routes = require('./user');
const person_routes = require('./person');
const country_routes = require('./country');
const region_routes = require('./region');
const address_routes = require('./address');
const occupation_routes = require('./occupation');
const ethnicGroup_routes = require('./ethnicGroup');
const educationalLevel_routes = require('./educationalLevel');
const appointment_routes = require('./appointment');
const medicalSpecialization_routes = require('./medicalSpecialization');
const period_routes = require('./period');
const specialityQuota_routes = require('./specialityQuota');
const usersAllocation_routes = require('./usersAllocation');

module.exports = app => {
    app.use('/api/v1', user_routes);
    app.use('/api/v1', person_routes);
    app.use('/api/v1', country_routes);
    app.use('/api/v1', region_routes);
    app.use('/api/v1', address_routes);
    app.use('/api/v1', occupation_routes);
    app.use('/api/v1', ethnicGroup_routes);
    app.use('/api/v1', educationalLevel_routes);
    app.use('/api/v1', appointment_routes);
    app.use('/api/v1', medicalSpecialization_routes);
    app.use('/api/v1', period_routes);
    app.use('/api/v1', specialityQuota_routes);
    app.use('/api/v1', usersAllocation_routes);

    app.use(router);
};