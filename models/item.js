var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plan: { type: String, required: true },
  inCart: { type: Boolean }
  },
   { timestamps: true }  // createdAt, updatedAt
  );

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

ItemSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

ItemSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};


module.exports = mongoose.model('Item', ItemSchema);
