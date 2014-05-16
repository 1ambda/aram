var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusSchema = new Schema({
  site: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
  imagePath: { type: String, required: true },
  serviceStatus: { type: Boolean, required: true }
});

mongoose.model('Status', StatusSchema);
