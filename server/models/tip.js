var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tipSchema = new Schema({
  eventId: { type: Number, required: true },
  eventName: { type: String, required: true },
  categoryName: { type: String, required: true },
  eventStart: { type: Date },
  betType: { type: String, required: true },
  betName: { type: String},
  betValue: { type: Number},
  status: { type: String, default: "open" }
})


// create a model
var Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;


