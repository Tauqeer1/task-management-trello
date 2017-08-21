const mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
  title: String,
  columnId: String,
  boardId: String,
  order: number
});

module.exports = mongoose.model('Card', cardSchema);
