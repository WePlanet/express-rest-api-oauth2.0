var express = require('express');
var passport = require('passport');
var auth = require('./auth');

// Passport setting
require('./passport').setup();

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    // access token 생성
    var token = auth.signToken(user.id);
    res.json({access_token: token});
  })(req, res, next);
});


module.exports = router;
