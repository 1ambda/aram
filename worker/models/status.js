var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusSchema = new Schema({
  siteName : { type: String, required: true },
  url : { type: String, required: true },
  date: { type: Date, required: true },
  imagePath: { type: String, required: true },
  serviceStatus: { type: String, required: true }
});


mongoose.model('Status', StatusSchema);




