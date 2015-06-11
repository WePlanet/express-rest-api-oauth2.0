var express = require('express');
var auth = require('./auth');
var router = express.Router();

/* GET users listing. */
router.get('/', auth.isAuthenticated(), function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
