const uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/results?ln=en'
let request = require('request')
let moment = require('moment')
let Prediction = require('../models/prediction');
let betType = require('../scripts/betTypes')
let Tip = require('../models/tip')

function checkResults() {
    console.log('started checking results')
    let getResults = new Promise((resolve) => {
        request.post({
            uri: 'http://mockbin.org/bin/32bd21fe-ac26-469c-b15e-01f52376bf4f'
        }, (err, res, body) => {
            if (err) {
                console.log(err)
            }
            else {
                let obj = JSON.parse(body)
                console.log(obj)
                resolve(obj)
            }
        })
    })  // Promise ends here

    //Checking Predicts for update of status
    Prediction.find({ status: 'pending' }, (err, predicts) => {
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
                        console.log(result.id === tip.eventId)
                        if (result.id === tip.eventId) {
                            result.t[betType[tip.betType]].forEach((option) => {
                                console.log(option.n === tip.betName)
                                if (option.n === tip.betName) {
                                    console.log(option.w)
                                    if (option.w === true) {
                                        tip.status = 'won'
                                        tip.save()
                                    }
                                    else {
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