var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusSchema = new Schema({
  siteName : { type: String, require: true, unique: true },
  url : { type: String, required: true },
  date: { type: Date, required: true },
  imagePath: { type: String, required: true },
  serviceStatus: { type: Boolean, required: true }
});

mongoose.model('Status', StatusSchema);
