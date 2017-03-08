var express = require('express');
var router = express.Router();
var Prediction = require('../server/models/prediction');
var Tip = require('../server/models/tip');
var moment = require('moment');

/* Submit  tip */
router.post('/', function (req, res, next) {

  let newPredict = Prediction({
    date: Date.now(),
    tips: [],
  })

  let proms = req.body.map((item) => {
    return new Promise((resolve) => {
      let newTip = Tip({
        eventId: item.eventId,
        eventName: item.eventName,
        categoryName: item.categoryName,
        eventStart: item.eventStart,
        betType: item.betType,
        betName: item.betName,
        betValue: item.betValue
      })
      newTip.save((err) => {
        if (!err) {
          newPredict.tips.push(newTip)
          resolve()
        }
      })
    })
  })

  Promise.all(proms).then(() => {
    newPredict.save((err) => {
      if (!err) res.status(200).send('success')
    })
  })
})

module.exports = router;
