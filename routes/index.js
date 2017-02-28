var express = require('express');
var router = express.Router();
var Game = require('../server/models/game');

/* GET home page. */

router.get('/', function (req, res, next) {
  Game.find(function (err, games) {

    if (err) {
      res.status(500).send(err);
    }
    else {

      // send the list of all games
      res.send(games);
    }
  });
})



module.exports = router;
