var express = require('express');
var router = express.Router();
var Prediction = require('../server/models/prediction');


/* Submit  tip */
router.post('/', function (req, res, next) {

  let newPredict = Prediction({
    date: Date.now(),
    tips: []
  })
  req.body.forEach((item, i) => {
    let newTip = {
      eventId: item.eventId,
      eventName: item.eventName,
      categoryName: item.categoryName,
      eventStart: item.eventStart,
      betId: item.betId,
    }
    newPredict.tips.push(newTip)
  })
  newPredict.save((err) => {
    if (!err) res.status(200)
  })
})

module.exports = router;
