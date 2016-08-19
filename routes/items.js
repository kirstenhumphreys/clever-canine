var express = require('express');
var router = express.Router();

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

let items = [
  {
    title: 'Small Dog',
    plan: '1 month'
  },
  {
    title: 'Medium Dog',
    plan: '3 month'
  },
  {
    title: 'Large Dog',
    plan: '6 month'
  }
];

//Index
router.get('/', function(req, res, next) {
  res.render('items/index', { items: items});
});

module.exports = router;
