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

//NEW
router.get('/new', function(req, res, next) {
  var item = {
    title: '',
    plan: '',
    inCart: false
  };
  res.render('items/new', { item: item } );
});

//SHOW

router.get('/:id', function(req, res, next) {
  item.findbyId(req.params.id)
  .then(function(todo) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    res.render('items/show', { item: item });
  }, function(err) {
    return next(err);
  });
});










module.exports = router;
