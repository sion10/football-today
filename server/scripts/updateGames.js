var obj = {};
var Game = require('../models/game');
var request = require('request');
var uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/leaguesMatches?ln=en&id=2615';

function updateGames() {
  console.log("update started");
  var game = {};
  request(uri, function (err, response, body) {
    if (err) {
      console.log(err);
    }
    else {
      obj = JSON.parse(body)[2615];
      obj.forEach(function (item) {
        game = {
          gameId: item.id,
          gameName: item.h.toUpperCase() + ' vs ' + item.a.toUpperCase(),
          categoryName: item.lId,
          eventStart: item.sd,
          sideHome: item.h,
          sideAway: item.a,
          markets: [
            item.t["0-10"],
            item.t["0-46"],
            item.t["0-43"],
            item.t["0-47"],
            item.t["0-60"]
          ]
        }
        Game.findOneAndUpdate({ gameId: game.gameId }, game, { new:true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
          function (err, games) {

            if (err) {
              console.log(err);
            }
          }
        )
      })
    }
  })
}

module.exports = updateGames;