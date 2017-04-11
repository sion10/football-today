var obj = {};
var Game = require('../models/game');
var request = require('request');
var uri = 'https://bookmakersapi.adjarabet.com/sportsbook/rest/public/leaguesMatches?ln=en&id=2553&id=2609&id=96892&id=96891&id=99334&id=99551&id=99311&id=99312&id=99580&id=99763&id=99553&id=62207&id=2615&id=2673&id=98976&id=98977&id=108607&id=106530&id=3148&id=2560';

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
function updateGames() {
  console.log("update started");
  var game = {};
  request(uri, function (err, response, body) {

    if (err || !IsJsonString(body)) {
      console.log(err + 'or not JSON string')
    }
    else {
      obj = JSON.parse(body)
      for (var key in obj) {
        obj[key].forEach((item) => {
          if (item.h && item.a) {
            game = {
              gameId: item.id,
              gameName: item.h.toUpperCase() + ' vs ' + item.a.toUpperCase(),
              categoryName: item.lId,
              eventStart: item.sd,
              sideHome: item.h,
              sideAway: item.a,
              markets: [{
                type: '3way',
                options: [],
                conflict: 1
              },
              {
                type: 'BTS',
                options: [],
                conflict: 1
              },
              {
                type: 'total(2.5)',
                options: [],
                conflict: 1
              },
              {
                type: 'doubleChance',
                options: [],
                conflict: 1
              }]
            }
            //3 Way Market Options
            if (item.t['0-10']!== undefined && item.t['0-10'][2]) {
              if (item.t['0-10'][0].n === '1') {
                game.markets[0].options[0] = item.t['0-10'][0]
                if (item.t['0-10'][1].n === 'X') {
                  game.markets[0].options[1] = item.t['0-10'][1]
                  game.markets[0].options[2] = item.t['0-10'][2]
                }
                else {
                  game.markets[0].options[2] = item.t['0-10'][1]
                  game.markets[0].options[1] = item.t['0-10'][2]
                }
              }
              else if (item.t['0-10'][0].n === 'X') {
                game.markets[0].options[1] = item.t['0-10'][0]
                if (item.t['0-10'][1].n === '1') {
                  game.markets[0].options[0] = item.t['0-10'][1]
                  game.markets[0].options[2] = item.t['0-10'][2]
                }
                else {
                  game.markets[0].options[2] = item.t['0-10'][1]
                  game.markets[0].options[0] = item.t['0-10'][2]
                }
              }
              else {
                game.markets[0].options[2] = item.t['0-10'][0]
                if (item.t['0-10'][1].n === '1') {
                  game.markets[0].options[0] = item.t['0-10'][1]
                  game.markets[0].options[1] = item.t['0-10'][2]
                }
                else {
                  game.markets[0].options[1] = item.t['0-10'][1]
                  game.markets[0].options[0] = item.t['0-10'][2]
                }
              }
            }
            // BTS Market Options
            if (item.t['0-43']!== undefined && item.t['0-43'][1]) {
              item.t['0-43'][0].n === 'Yes' ? game.markets[1].options = item.t['0-43'] : game.markets[1].options = [item.t['0-43'][1], item.t['0-43'][0]]
            }
            // More 2.5 Market Options
            if (item.t['0-60']!== undefined && item.t['0-60'][1]) {
              item.t['0-60'][0].n === 'Under' ? game.markets[2].options = item.t['0-60'] : game.markets[2].options = [item.t['0-60'][1], item.t['0-60'][0]]
            }
            //doubleChance Market Options
            if (item.t['0-46']!== undefined && item.t['0-46'][2]) {
              if (item.t['0-46'][0].n === '1X') {
                game.markets[3].options[0] = item.t['0-46'][0]
                if (item.t['0-46'][1].n === '12') {
                  game.markets[3].options[1] = item.t['0-46'][1]
                  game.markets[3].options[2] = item.t['0-46'][2]
                }
                else {
                  game.markets[3].options[2] = item.t['0-46'][1]
                  game.markets[3].options[1] = item.t['0-46'][2]
                }
              }
              else if (item.t['0-46'][0].n === '12') {
                game.markets[3].options[1] = item.t['0-46'][0]
                if (item.t['0-46'][1].n === '1X') {
                  game.markets[3].options[0] = item.t['0-46'][1]
                  game.markets[3].options[2] = item.t['0-46'][2]
                }
                else {
                  game.markets[3].options[2] = item.t['0-46'][1]
                  game.markets[3].options[0] = item.t['0-46'][2]
                }
              }
              else {
                game.markets[3].options[2] = item.t['0-46'][0]
                if (item.t['0-46'][1].n === '1X') {
                  game.markets[3].options[0] = item.t['0-46'][1]
                  game.markets[3].options[1] = item.t['0-46'][2]
                }
                else {
                  game.markets[3].options[1] = item.t['0-46'][1]
                  game.markets[3].options[0] = item.t['0-46'][2]
                }
              }
            }


            Game.findOneAndUpdate({ gameId: game.gameId }, game, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
              function (err, games) {

                if (err) {
                  console.log(err);
                }
              }
            )
          }//
        })//forEach ends here
      }
    }
  })
}

module.exports = updateGames;