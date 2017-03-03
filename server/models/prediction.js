var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipSchema = new Schema({
  eventId: { type: Number, required: true },
  eventName: { type: String, required: true },
  categoryName: { type: String, required: true },
  eventStart: { type: Date },
  betId: { type: Number, required: true },
  status: { type: String, default: "open" }
})
// create a schema
var predictionSchema = new Schema({
  date: { type: Date },
  status: { type: String, default: "pending" },
  tips: [tipSchema]

});

// create a model
var Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;


