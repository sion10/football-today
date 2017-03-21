var express = require('express');
var router = express.Router();
var Game = require('../server/models/game');
var User = require('../server/models/user');
var Prediction = require('../server/models/prediction');
var ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment')

/* GET home page. */

router.get('/', function (req, res, next) {
  Game.find({ eventStart: { $gte: moment() }, categoryName: '2615' })
    .sort({
      eventStart: 1
    }).exec((err, games) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        // send the list of all games
        res.send(games);
      }
    })
});

router.post('/getleague', (req, res, next) => {
  Game.find({ eventStart: { $gte: moment() }, categoryName: req.body.id })
    .sort({
      eventStart: 1
    }).exec((err, games) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        // send the list of all games
        res.send(games);
      }
    })
});

router.get('/getworld', (req, res, next) => {
  Game.find({ eventStart: { $gte: moment() }, categoryName: {$in: ['96892', '96891', '99334', '99551', '99311', '99312', '99580', '99763', '99553', '62207', '98976', '98977', '108607', '106530']} })
    .sort({
      eventStart: 1
    }).exec((err, games) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        // send the list of all games
        res.send(games);
      }
    })
});


router.get('/user', function (req, res, next) {
  User.findOne({ fbId: req.userId }, (err, user) => {
    res.json(user)
  })
})

router.post('/predictions', (req, res, next) => {
  let page = req.body.page
  Prediction.find()
    .limit(10)
    .skip(10 * page)
    .sort({
      date: 'desc'
    }).exec((err, predictions) => {
      Prediction.count((err, count) => {
        let hasMore = (count - (page + 1) * 10) > 0
        let results = []
        let proms = predictions.map((item) => {
          return new Promise((resolve) => {
            item.populate('tips user', (err, populated) => {
              results.push(populated)
              resolve()
            })
          })
        })//map ends here
        Promise.all(proms).then(() => {
          res.json({
            predictions: results,
            hasMore: hasMore,
            page: (page + 1)
          })
        })
      })
    })
})

module.exports = router;