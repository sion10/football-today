const uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/results?ln=en'
let request = require('request')
let moment = require('moment')
let Prediction = require('../models/prediction');
let betType = require('../scripts/betTypes')

function checkResults() {
    console.log('started checking results')
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
                let tipResults = body[0].c.forEach((item) => {
                    if (item.id === 331) {
                        item.l.forEach((league) => {
                            if (league.id === 2615) {
                                return league.m
                            }
                        })
                    }
                })
                resolve(tipResults)
            }
        })
    })  // Promise ends here

    //Checking Predicts for update of status
    let pendingPredicts = Prediction.find({ status: 'pending' }, (err, predicts) => {
        predicts.map((predict) => {
            predict.populate('tips', (err, item) => {
                let status
                item.tips.forEach((tip) => {
                    if (tip.status === 'lost') {
                        status = 'lost'
                        return
                    }
                    else if (tip.status === 'open') {
                        return
                    }
                    else {
                        status = 'won'
                    }
                }) // end tips forEach
                predict.status = status
                predict.save()
            })  // end populate callBack
        })// end predicts map
    })

    //Check individual tips Statuses
    getResults.then((results) => {
        let openTips = Tip.find({ status: 'open' }, (err, tips) => {
            tips.map((tip) => {
                if (moment() > (moment(tip.eventStart).add(3, 'h'))) {
                    // check outcome of the event
                    results.forEach((result) => {
                        if (result.id === tip.eventId) {
                            result.t[betType[tip.betType]].forEach((option)=> {
                                if (option.n === tip.betName){
                                    if(option.w === true){
                                        tip.status = 'won'
                                        tip.save()
                                    }
                                    else{
                                        tip.status = 'lost'
                                        tip.save()
                                    }
                                }
                            })
                        }
                    })
                }
            })
        })
    })
}

module.exports = checkResults