const uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/results?ln=en'
const uri2 = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/matchResults/?ln=en&mId='
let request = require('request')
let moment = require('moment')
let Prediction = require('../models/prediction');
let betType = require('../scripts/betTypes')
let Tip = require('../models/tip')

function checkResults() {
    console.log('started checking the results')
    let getResults = new Promise((resolve) => {
        request.post({
            uri: uri,
            json: {
                date: moment(Date.now()).format('YYYY-MM-DD'),
                sportIds: [27]
            }
        }, (err, res, body) => {
            if (err) {
                console.log(err)
            }
            else {
                let tipResults
                for (let i = 0; i < body[0].c.length; i++) {
                    if (body[0].c[i].id === 331) {
                        for (let x = 0; x < body[0].c[i].l.length; x++) {
                            if (body[0].c[i].l[x].id === 2615) {
                                tipResults = body[0].c[i].l[x].m
                            }
                        }
                    }
                }
                resolve(tipResults)
            }
        })
    })  // Promise ends here

    //Check individual tips Statuses
    getResults.then((results) => {
        //Find all tips with status : "open"
        Tip.find({ status: 'open' }, (err, tips) => {
            // map through tips with open status
            tips.map((tip) => {
                if (moment() > (moment(tip.eventStart).add(3, 'h'))) {
                    //loop through recent results
                    for (let n = 0; n < results.length; n++) {
                        //Check if event ids of tip and results match

                        if (results[n].id === tip.eventId) {
                            let getReqProm = new Promise((resolve) => {
                                request.get({
                                    uri: uri2 + tip.eventId + '&d=2014-05-05'
                                }, (err, res, body) => {
                                    let typesObj = JSON.parse(body).t
                                    for (var property in typesObj) {
                                        if (typesObj.hasOwnProperty(property)) {
                                            results[n].t[property] = typesObj[property]
                                            resolve(results[n].t)
                                        }
                                    }
                                })
                            }) //get additional details for matched results for open tips
                            getReqProm.then((types) => {
                                for (let x = 0; x < results[n].t[betType[tip.betType]].length; x++) {
                                    if (results[n].t[betType[tip.betType]][x].n === tip.betName) {
                                        if (results[n].t[betType[tip.betType]][x].w === true) {
                                            tip.status = 'won'
                                            tip.save()
                                        }
                                        else {
                                            tip.status = 'lost'
                                            tip.save()
                                        }
                                    }
                                }//bet types loop ends here
                            })
                        }
                    }//  loop through results ends here
                }// finished or not IF statement ends here
            }) // map through tips with open status ends here
        })//Find all tips with status : "open" ends here
    })//Check individual tips Statuses ends here

    //Checking Predicts for update of status
    Prediction.find({status: 'pending'}, (err, predicts) => {
        predicts.map((predict) => {
            predict.populate('tips', (err, item) => {
                let status = item.status
                let counter = 0
                for (let i = 0; i < item.tips.length; i++) {
                    if (item.tips[i].status === 'lost') {
                        status = 'lost'
                        predict.status = status
                        predict.save((err, product) => {
                        })
                        return
                    }
                    else if (item.tips[i].status === 'open') {
                        return
                    }
                    else {
                        counter++
                        counter === item.tips.length ? status = 'won' : null
                    }
                } // end tips loop
            })  // end populate callBack
        })// end predicts map
    })
}

module.exports = checkResults