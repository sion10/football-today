let Tip = require('../../models/tip')
let moment = require('moment')
let rp = require('request-promise')
let uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/matchResults/?ln=en&mId='
let getResults = require('./getResults')
let betType = require('../../scripts/betTypes')

let checkTips = (results) => {
    console.log('started  checking tips')
    Tip.find({ status: 'open', eventStart: { $lte: moment().subtract(1.5, 'h') } }).exec()
        .then((tips) => {
           let tipsProms = tips.map((tip) => {
                return new Promise((resolve, reject) => {
                    let counter = 0
                    for (let i = 0; i < results.length; i++) {
                        if (tip.eventId === results[i].id) {
                            getTypes(results[i], tip).then((newResult) => {
                                newResult.t[betType[tip.betType]].forEach((betType) => {
                                    if (betType.n === tip.betName) {
                                        if (betType.w === true) {
                                            tip.status = 'won'
                                            tip.save().then(() => resolve())
                                        }
                                        else {
                                            tip.status = 'lost'
                                            tip.save().then(() => resolve())
                                        }
                                    }
                                })
                            })
                        }
                        else {
                            counter++
                            if (counter === results.lenght) {
                                resolve()
                            }
                        }
                    }
                })
            })
            return new Promise((reslv, rej) => {
                Promise.all(tipsProms).then(
                    reslv()
                ).catch((err) => console.log(err))
            })

        })
}

let getTypes = (result, tip) => {
    return new Promise((resolve, reject) => {
        rp(uri + tip.eventId + '&d=2014-05-05', { json: true })
            .then((body) => {
                for (let property in body.t) {
                    if (body.t.hasOwnProperty(property)) {
                        result.t[property] = body.t[property]
                    }
                }
                resolve(result)
            }).catch((err)=> console.log(err))
    })
}


module.exports = checkTips