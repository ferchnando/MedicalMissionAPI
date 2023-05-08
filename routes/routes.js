const router = require('express').Router();
const user_routes = require('./user');
const person_routes = require('./person');

module.exports = app => {
    app.use('/api', user_routes);
    app.use('/api', person_routes);
    app.use(router);
};