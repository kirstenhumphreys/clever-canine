var express = require('express');
var router = express.Router();

var Item = require('../models/item');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

//INDEX
router.get('/', authenticate, function(req, res, next) {
  var items = global.currentUser.items;
  res.render('items/index', { items: items, message: req.flash() });
});

//CART
router.get('/:id/cart', authenticate, function(req, res, next) {
  var items = global.currentUser.items;
  res.render('items/index', { items: items, message: req.flash() });
});

//NEW - Item or Subscription
router.get('/new', authenticate, function(req, res, next) {
  var item = {
    title: '',
    plan: '',
    inCart: false
  };
  res.render('items/new', { item: item, message: req.flash() } );
});



//SHOW - Items
router.get('/:id', authenticate, function(req, res, next) {
  var item = currentUser.items.id(req.params.id);
  if (!item) return next(makeError(res, 'Document not found', 404));
  res.render('items/show', { item: item, message: req.flash() } );
});

//CREATE - Add Items to Cart
router.post('/', authenticate, function(req, res, next) {
  var item = new Item({
    title: req.body.title,
    plan: req.body.plan,
    inCart: req.body.inCart ? false : true
  });
  currentUser.items.push(item);
  currentUser.save()
  .then(function() {
    res.redirect('/items');
  }, function(err) {
    return next(err);
  });
});

//EDIT - Cart
router.get('/:id/edit', authenticate, function(req, res, next) {
  var item = currentUser.items.id(req.params.id);
  if (!item) return next(makeError(res, 'Document not found', 404));
  res.render('items/edit', { item: item, message: req.flash() } );
});

//UPDATE - Cart
router.put('/:id', authenticate, function(req, res, next) {
  var item = currentUser.items.id(req.params.id);
  if (!item) return next(makeError(res, 'Document not found', 404));
  else {
    item.title = req.body.title;
    item.plan = req.body.plan;
    item.inCart = req.body.inCart ? true : false;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/items');
    }, function(err) {
      return next(err);
    });
  }
});


//DESTROY - Remove From Cart
router.delete('/:id', authenticate, function(req, res, next) {
  var item = currentUser.items.id(req.params.id);
  if (!item) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.items.indexOf(item);
  currentUser.items.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/items');
  }, function(err) {
    return next(err);
  });
});

//TOGGLE cart
router.get('/:id/toggle', function(req, res, next) {
  Item.findById(req.params.id)
  .then(function(item) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    item.inCart = !item.inCart;
    return item.save();
  })
  .then(function(saved) {
    res.redirect('/items');
  }, function(err) {
    return next(err);
  });
});


module.exports = router;
