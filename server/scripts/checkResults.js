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
                    if (body[0].c[i].id === 304) {
                        for (let x = 0; x < body[0].c[i].l.length; x++) {
                            if (body[0].c[i].l[x].id === 2560) {
                                tipResults = body[0].c[i].l[x].m
                            }
                        }
                    }
                }
                resolve(tipResults)
            }
        })
    })  // Promise ends here

    //Checking Predicts for update of status
    let pendingPredicts = Prediction.find({ status: 'pending' }, (err, predicts) => {
        predicts.map((predict) => {
            predict.populate('tips', (err, item) => {
                let status
                for (let i = 0; i < item.tips.length; i++) {
                    if (item.tips[i].status === 'lost') {
                        status = 'lost'
                        return
                    }
                    else if (item.tips[i].status === 'open') {
                        return
                    }
                    else {
                        status = 'won'
                    }
                } // end tips loop
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
                    for (let n = 0; n < results.length; n++) {
                        if (results[n].id === tip.eventId) {
                            for (let x = 0; x < results[n].t[betType[tip.betType]].length; x++) {
                                if (option.n === tip.betName) {
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
                        }
                    }//results loop ends here
                }
            })
        })
    })
}

module.exports = checkResults