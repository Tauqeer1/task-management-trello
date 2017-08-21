const mongoose = require('mongoose');

let columnSchema = mongoose.Schema({
  title: String,
  boardId: String,
  order: Number
});
