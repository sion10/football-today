let rp = require('request-promise')
let toCheck = require('../listToCheck')

let fetchIt = (o, resolve) => {
    rp(o).then((body) => {
        let results = []
        for (let i = 0; i < body[0].c.length; i++) {
            if (toCheck.countries.indexOf(body[0].c[i].id) > -1) {
                for (let x = 0; x < body[0].c[i].l.length; x++) {
                    if (toCheck.leagues.indexOf(body[0].c[i].l[x].id) > -1) {
                        results = results.concat(body[0].c[i].l[x].m)
                    }
                }
            }
        }
        resolve(results)
    })
        .catch((reason) => {
            counter++
            if (counter < 9) {
                console.log('fetch faild, reason: ' + reason + ' retrying... try #' + counter)
                fetchIt(o, resolve)
            }
            else { console.log('get results err: ' + reason) }
        })
}
let counter = 0
let getResults = (uri, date) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            uri: uri,
            body: {
                date: date,
                sportIds: [27]
            },
            json: true
        }
        fetchIt(options, resolve)
    })
}

module.exports = getResults