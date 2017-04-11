var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('./config.json');

module.exports = (req, res, next) => {
    if (!req.userId) {
        return res.status(401).end();
    }
    return next();
};