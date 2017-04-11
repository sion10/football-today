var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('./config.json');

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        // get the last part from a authorization header string like "bearer token-value"
        var token = req.headers.authorization.split(' ')[1].split('=')[1];
        // decode the token using a secret key-phrase
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            // the 401 code is for unauthorized status
            if (!err) {
                var userId = decoded.sub;
                // check if a user exists
                User.findOne({ 'fbId': userId }, (userErr, user) => {
                    if (userErr || !user) {
                        return next();
                    }
                    req.userId = userId
                    return next();
                })
            }
            else {
                console.log('decoding err ' + err)
                return next()
            }
        });
    }
    else {
        return next();
    }

};