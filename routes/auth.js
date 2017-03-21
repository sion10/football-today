var express = require('express');
var passport = require('passport');
var router = new express.Router();

router.get('/', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/', session: false }), 
    (req, res) => {
        res.status(200)
        res.cookie('token', req.user, {maxAge: 10000 });
        res.redirect('/');
        res.end()
    })
module.exports = router;
