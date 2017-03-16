var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var predictionSchema = new Schema({
  date: { type: Date },
  status: { type: String, default: "pending"},
  tips: [{type: Schema.Types.ObjectId, ref: 'Tip'}],
  user: {type: String, ref: 'User'}
});

// create a model
var Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;


{}