var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../scripts/config.json');
var jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy({

    // pull in our app id and secret from our auth.js file
    clientID: this.config.clientID,
    clientSecret: this.config.clientSecret,
    callbackURL: this.config.callbackURL,
    profileFields: ['email', 'id', 'name', 'gender', 'photos']

},

    // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {


        // asynchronous
        process.nextTick(function () {

            // find the user in the database based on their facebook id
            User.findOne({
                'fbId': profile.id
            }, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                }
                else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.fbId = profile.id; // set the users facebook id                   
                    newUser.token = token; // we will save the token that facebook provides to the user                    
                    newUser.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.picture = profile.photos[0].value;


                    // save our user to the database
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        var payload = {
                            sub: profile.id
                        }
                        
                        var token = jwt.sign(payload, config.jwtSecret);

                        // if successful, return the new user
                        return done(null, token);
                    });
                }

            });
        });

    });