var express = require('express');
var router = express.Router();

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// let items = [
//   {
//     title: 'Small Dog',
//     plan: '1 month'
//   },
//   {
//     title: 'Medium Dog',
//     plan: '3 month'
//   },
//   {
//     title: 'Large Dog',
//     plan: '6 month'
//   }
// ];

//INDEX
router.get('/', function(req, res, next) {
  Item.find({})
  .then(function(todos) {
    res.render('items/index', { item: item });
  }, function(err) {
    return next(err);
  });
});

//NEW - Item or Subscription
router.get('/new', function(req, res, next) {
  var item = {
    title: '',
    plan: '',
    inCart: false
  };
  res.render('items/new', { item: item } );
});

//SHOW - Items
router.get('/:id', function(req, res, next) {
  item.findbyId(req.params.id)
  .then(function(todo) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    res.render('items/show', { item: item });
  }, function(err) {
    return next(err);
  });
});

//CREATE - Add Items to Cart
router.post('/', function(req, res, next) {
  var todo = new Todo({
    title: req.body.title,
    plan: req.body.plan,
    inCart: req.body.inCart ? true : false
  });
  item.save()
  .then(function(saved) {
    res.redirect('/items');
  }, function(err) {
    return next(err);
  });
});

//EDIT - Cart
router.get('/:id/edit', function(req, res, next) {
  Item.findbyId(req.params.id)
  .then(function(item) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    res.render('items/edit', { item : item });
  }, function(err) {
    return next(err);
  });
});

//UPDATE - Cart
router.put('/:id', function(req, res, next) {
  Item.findById(req.params.id)
  .then (function(item) {
    if (!item) retrun next(makeError(res, 'Document not found', 404));
    item.title = req.body.title;
    item.plan = req.body.plan;
    item.inCart = req.body.inCart ? true : false;
    return item.save();
  })
  .then(function(saved) {
    res.redirect('/items');
  }, function(err) {
    return next(err);
  });
});

//DESTROY - Remove From Cart
router.delete('/:id', function(req, res, next) {
  Item.findByIdandRemove(req.params.id)
  .then(function() {
    res.redirect('/items');
  }, function(err) {
    return next(err);
  });
});


module.exports = router;
