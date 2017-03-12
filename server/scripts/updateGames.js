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
      obj = (JSON.parse(body))['2615'];
      obj.forEach(function (item) {
        game = {
          gameId: item.id,
          gameName: item.h.toUpperCase() + ' vs ' + item.a.toUpperCase(),
          categoryName: item.lId,
          eventStart: item.sd,
          sideHome: item.h,
          sideAway: item.a,
          markets: [{
            type: '3way',
            options: [{
              id: item.t['0-10']?item.t['0-10'][0].id: 0,
              name: item.t['0-10']?item.t['0-10'][0].n: 0,
              value: item.t['0-10']?item.t['0-10'][0].v: 0
            },
            {
              id: item.t['0-10']?item.t['0-10'][1].id: 0,
              name: item.t['0-10']?item.t['0-10'][1].n: 0,
              value: item.t['0-10']?item.t['0-10'][1].v: 0
            },
            {
              id: item.t['0-10']?item.t['0-10'][2].id: 0,
              name: item.t['0-10']?item.t['0-10'][2].n: 0,
              value: item.t['0-10']?item.t['0-10'][2].v: 0
            }],
            conflict: 1
          },
          {
            type: 'BTS',
            options: [{
              id: item.t['0-43']?item.t['0-43'][0].id: 0,
              name: item.t['0-43']?item.t['0-43'][0].n: 0,
              value: item.t['0-43']?item.t['0-43'][0].v: 0
            },
            {
              id: item.t['0-43']?item.t['0-43'][1].id: 0,
              name: item.t['0-43']?item.t['0-43'][1].n: 0,
              value: item.t['0-43']?item.t['0-43'][1].v: 0
            }],
            conflict: 1
          },
          {
            type: 'total(2.5)',
            options: [{
              id: item.t['0-60']?item.t['0-60'][0].id: 0,
              name: item.t['0-60']?item.t['0-60'][0].n: 0,
              value: item.t['0-60']?item.t['0-60'][0].v: 0
            },
            {
              id: item.t['0-60']?item.t['0-60'][1].id: 0,
              name: item.t['0-60']?item.t['0-60'][1].n: 0,
              value: item.t['0-60']?item.t['0-60'][1].v: 0
            }],
            conflict: 1
          },
          {
            type: 'doubleChance',
            options: [{
              id: item.t['0-46']?item.t['0-46'][0].id:  0,
              name: item.t['0-46']?item.t['0-46'][0].n: 0,
              value: item.t['0-46']?item.t['0-46'][0].v: 0
            },
            {
              id: item.t['0-46']?item.t['0-46'][1].id: 0,
              name: item.t['0-46']?item.t['0-46'][1].n: 0,
              value: item.t['0-46']?item.t['0-46'][1].v: 0
            },
            {
              id: item.t['0-46']?item.t['0-46'][2].id: 0,
              name: item.t['0-46']?item.t['0-46'][2].n: 0,
              value: item.t['0-46']?item.t['0-46'][2].v: 0
            }],
            conflict: 1
          }]
        }

        Game.findOneAndUpdate({ gameId: game.gameId }, game, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
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