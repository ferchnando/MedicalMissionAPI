const router = require('express').Router();
const user_routes = require('./user');

module.exports = app => {
    app.use('/api', user_routes);
    app.use(router);
};