var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  inCart: { type: Boolean, required: true }
});

module.exports = mongoose.model('Item', ItemSchema);
