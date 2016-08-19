var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plan: { type: String, required: true },
  inCart: { type: Boolean }
});

module.exports = mongoose.model('Item', ItemSchema);
