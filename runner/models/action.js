var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActionSchema = new Schema({
  siteName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  actionFile: { type: String, required: true },
  actionFunction: { type: String, required: true }
});

mongoose.model('Action', ActionSchema);


