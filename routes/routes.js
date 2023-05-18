const router = require('express').Router();
const user_routes = require('./user');
const person_routes = require('./person');

module.exports = app => {
    app.use('/api/v1', user_routes);
    app.use('/api/v1', person_routes);
    app.use(router);
};