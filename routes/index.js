var express = require('express');
var router = express.Router();
var Game = require('../server/models/game');
var Prediction = require('../server/models/prediction');
var ObjectId = require('mongoose').Types.ObjectId;

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

router.get('/predictions', (req, res, next) => {
  Prediction.find((err, predictions) => {
    let results = []
    let proms = predictions.map((item) => {
      return new Promise((resolve) => {
        item.populate('tips', (err, populated)=>{
          results.push(populated)
          resolve()
        })
      })
    })//map ends here
    Promise.all(proms).then(() => {
        res.send(results)
    })
  })
})

module.exports = router;

