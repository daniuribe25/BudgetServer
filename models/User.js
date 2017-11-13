var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var user = new Schema({
  name:    { type: String },
  lastName:     { type: String },
  User:  { type: String },
  pass:   { type: String },
  email:  { type: String }
});

module.exports = mongoose.model('User', user);