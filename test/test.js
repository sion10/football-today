var assert = require('assert');
var mongoose = require('mongoose');
var Prediction = require('../server/models/prediction');
var Tip = require('../server/models/tip');
var User = require('../server/models/user');
var moment = require('moment');
var assert = require('chai').assert
var request = require('request')
var should = require('chai').should();
var uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/results?ln=en'
var uri2 = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/matchResults/?ln=en&mId='
var betType = require('../server/scripts/betTypes')
var toCheck = require('../server/scripts/listToCheck')

describe('Connection', function () {
  before('drop testing db', function (done) {
    mongoose.connect('mongodb://localhost/mocha', function () {
      mongoose.connection.db.dropDatabase(function () {
        done()
      })
    })
  });

  describe('Create a Prediction', function () {
    var newTip, newTip2
    it('creates a tip record in DB', function (done) {
      newTip = new Tip({
        "eventId": 7751039,
        "eventName": "NIGERIA vs SENEGAL",
        "categoryName": "2673",
        "eventStart": moment().subtract(1, 'day'),
        "betType": "3way",
        "betName": "2",
        "betValue": 2.5,
        "status": "open",
        "__v": 0
      })
      newTip2 = new Tip({
        "eventId": 7751037,
        "eventName": "BRAZIL vs ARG",
        "categoryName": "2673",
        "eventStart": moment().subtract(1, 'day'),
        "betType": "3way",
        "betName": "1",
        "betValue": 1.5,
        "status": "open",
        "__v": 0
      })

      newTip.save().then(function () {
        newTip2.save().then(function () {
          Tip.find({}, function (err, res) {
            assert.lengthOf(res, 2, '2 items saved in tips collection')
            done()
          })
        })
      })

    })

    it('creates a prediction record in DB', function (done) {
      var prediction = new Prediction({
        "date": moment().subtract(2, 'days'),
        "user": "58c3fa3e705b612ed41738f9",
        "tips": [],
        "status": "pending",
        "__v": 0
      })
      prediction.tips.push(newTip, newTip2)
      prediction.save(function (err, predict) {
        Prediction.find({}, function (err, predicts) {
          assert.lengthOf(predicts, 1, '1 item should be in predictions collection')
          assert.lengthOf(predicts[0].tips, 2, 'prediction should have 2 tips')
          done()
        })
      })
    })

  });


  describe('Get Results array', function () {
    let results = []
    it('grabs results array from API', function (done) {
      request.post({
        uri: uri,
        json: {
          date: "2017-03-22",
          sportIds: [27]
        }
      }, function (err, res, body) {
        if (err) {
          console.log(err)
        }
        else {
          for (let i = 0; i < body[0].c.length; i++) {
            if (toCheck.countries.indexOf(body[0].c[i].id) > -1) {
              for (let x = 0; x < body[0].c[i].l.length; x++) {
                if (toCheck.leagues.indexOf(body[0].c[i].l[x].id) > -1) {

                  results = results.concat(body[0].c[i].l[x].m)
                }
              }
            }
          }
          assert.typeOf(results, 'array', 'results should be an array')
          assert.isAbove(results.length, 0, 'results should have at least 1 mathc')
          done()
        }
      })
    })

    it('checks statuses of tips against results', function (done) {
      Tip.find({ status: 'open' }, (err, tips) => {
        // map through tips with open status
        let tipsPromises = tips.map((tip) => {
          return new Promise(function (solve) {
            if (moment() > (moment(tip.eventStart).add(3, 'h'))) {
              //loop through recent results
              for (let n = 0; n < results.length; n++) {
                //Check if event ids of tip and results match
                if (results[n].id === tip.eventId) {
                  var getReqProm = new Promise(function (resolve) {
                    request.get({
                      uri: uri2 + tip.eventId + '&d=2014-05-05'
                    }, function (err, res, body) {
                      let typesObj = JSON.parse(body).t
                      for (var property in typesObj) {
                        if (typesObj.hasOwnProperty(property)) {
                          results[n].t[property] = typesObj[property]
                        }
                      }
                      resolve(results[n].t)
                    })
                  }) //get additional details for matched results for open tips
                  getReqProm.then(function (types) {
                    for (let x = 0; x < results[n].t[betType[tip.betType]].length; x++) {
                      if (results[n].t[betType[tip.betType]][x].n === tip.betName) {
                        if (results[n].t[betType[tip.betType]][x].w === true) {
                          tip.status = 'won'
                          tip.save(function (err, stip) {
                            solve()
                          })
                        }
                        else {
                          tip.status = 'lost'
                          tip.save(function () {
                            solve()
                          })
                        }
                      }
                    }//bet types loop ends here
                  })
                }
              }//  loop through results ends here
            }// finished or not IF statement ends here
            else {
              solve()
            }
          })

        })// map through tips with open status ends here
        Promise.all(tipsPromises).then(function () {
          console.log('resolved all tips promises')
          Tip.find({ status: "open" }, function (err, res) {
            assert.lengthOf(res, 0, 'there should be no open tips')
            done()
          })
        })
      })

    })

    it('check statuses of pending predictions', function (done) {
      Prediction.find({ status: 'pending' }, (err, predicts) => {
        let predictsProm = predicts.map((predict) => {
          return new Promise(function(resolve, reject){
            predict.populate('tips', (err, item) => {
              let status = item.status
              let counter = 0
              for (let i = 0; i < item.tips.length; i++) {
                if (item.tips[i].status === 'lost') {
                  status = 'lost'
                  predict.status = status
                  predict.save( function(){resolve()})
                  return
                }
                else if (item.tips[i].status === 'open') {
                  return resolve()
                }
                else {
                  counter++
                  if (counter === item.tips.length) {
                    predict.status = 'won'
                    predict.save(function(){resolve()})
                    return
                  }
                }
              } // end tips loop
            })  // end populate callBack
          })
        })// end predicts map
        Promise.all(predictsProm).then(function(){
          Prediction.find({status: 'pending'},function (err, found){
            assert.lengthOf(found, 0, 'should be no pending predicts')
            done()
          })
        })
      })
    })
  })
});