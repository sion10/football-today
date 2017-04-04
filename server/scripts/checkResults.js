const uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/results?ln=en'
const uri2 = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/matchResults/?ln=en&mId='
let request = require('request')
let moment = require('moment')
let betType = require('../scripts/betTypes')
let Tip = require('../models/tip')
let getResults = require('./resultsHelpers/getResults')
let checkTips = require('./resultsHelpers/checkTips')
let checkPredicts = require('./resultsHelpers/checkPredicts')

function checkResults(d) {
    console.log('started checking the results')
    let date = moment(d).format('YYYY-MM-DD')
    getResults(uri, date)
    .then(checkTips)
    .then(checkPredicts)
}

module.exports = checkResults