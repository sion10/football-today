var express = require('express');
var passport = require('passport');
var router = new express.Router();

router.get('/', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/', session: false }), 
    (req, res) => {
        res.cookie('token', req.user, {maxAge: 60000 });
        res.redirect('/');

    })
module.exports = router;
