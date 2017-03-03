const uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/results?ln=en'
let request = require('request')
let moment = require('moment')
let obj = {}

function checkResults() {
    console.log('started checking results')
    let requestPromise = new Promise((resolve) => {
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
                resolve(body)
            }
        })
    })  // Promise ends here
    
    // TODO check all predictions with open status 
    //(? add should end prop to the prediction = the greatest
    // eventStart time of predicts>tips + 3h)
    // Open Status && shoulEnd < time now
}

module.exports = checkResults