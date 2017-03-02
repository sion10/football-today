var express = require('express');
var router = express.Router();
var Tip = require('../server/models/tip');
var Prediction = require('../server/models/prediction');


/* Submit  tip */
router.post('/', function (req, res, next) {

  let newPredict = Prediction({
    date: Date.now()
  })
  newPredict.save(function (err) {
    if (err) {
      console.log(err)
    }
    else {
      req.body.forEach((item, i) => {
        let newTip = Tip({
          eventId: item.eventId,
          eventName: item.eventName,
          categoryName: item.categoryName,
          eventStart: item.eventStart,
          betId: item.betId,
          prediction: newPredict._id
        })

        newTip.save(function (err) {
          if (err) {
            console.log(err)
          }
          else {
            console.log('tip created');
          }
        })
      });
    }
  })
})

module.exports = router;
