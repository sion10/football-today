var express = require('express');
var router = express.Router();
var Tip = require('../server/models/tip');

/* Submit  tip */
router.post('/', function (req, res, next) {
  var newTip = Tip({
    eventId: req.body.eventId,
    eventName: req.body.eventName,
    categoryName: req.body.categoryName,
    eventStart: req.body.eventStart,
    betId: req.body.betId
  })

  newTip.save(function (err) {
    if (err) {
      res.json(err)
    }
    else {
      res.send('tip created');
    }
  })
});

module.exports = router;
