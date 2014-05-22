var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RestartSchema = new Schema({
  siteNmae: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

mongoose.model('RestartHistory', RestartSchema);


