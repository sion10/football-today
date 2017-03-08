var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gameSchema = new Schema({
  gameId: { type: Number, required: true },
  gameName: { type: String, required: true },
  categoryName: { type: String, required: true },
  eventStart: { type: Date },
  sideHome: { type: String, required: true },
  sideAway: { type: String, required: true },
  markets: [{
    type: { type: String },
    options: [{
      id: { type: Number },
      name: { type: String },
      value: { type: Number }
    }],
    conflict: {type: Number}
  }],
  status: { type: String, default: "upcoming" }
});

// create a model
var Game = mongoose.model('Game', gameSchema);

module.exports = Game;