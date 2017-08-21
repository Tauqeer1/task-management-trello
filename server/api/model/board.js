const mongoose = require('mongoose');

let boardSchema = mongoose.Schema({
  title: String
});
module.exports = mongoose.model('Board', boardSchema);
