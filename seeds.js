var mongoose = require('mongoose');
var Item = require('./models/item');
var bluebird = require('bluebird');

mongoose.connect('mongodb://localhost/items');
mongoose.Promise = require('bluebird');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old subscriptions...');
Item.remove({})
.then(function() {
  console.log('old subscriptions removed');
  console.log('creating new subscriptions...');
  var smallCanine  = new Item({ title: 'Small Canine', plan: '1 Month', inCart: false });
  var mediumCanine = new Item({ title: 'Medium Canine', plan: '6 Month', inCart: false });
  var largeCanine = new Item({ title: 'Medium Canine', plan: '3 Month', inCart: true})
  return Item.create([smallCanine, mediumCanine, largeCanine]);
})
.then(function(savedItem) {
  console.log('Just saved', savedItem.length, 'a subscription.');
  return Item.find({});
})
.then(function(allItems) {
  console.log('Printing all subscriptions:');
  allItems.forEach(function(item) {
    console.log(item);
  });
  return Item.findOne({title: 'Small Canine'});
})
.then(function(smallCanine) {
  smallCanine.inCart = true;
  return smallCanine.save();
})
.then(function(smallCanine) {
  console.log('updated subscriptions: ', smallCanine);
  return smallCanine.remove();
})
.then(function(deleted) {
  return Item.find({});
})
.then(function(allItems) {
  console.log('Printing all subscriptions: ');
  allItems.forEach(function(item) {
    console.log(item);
  });
  quit();
});
