'use strict';

var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = 'token_secret';
var EXPIRES = 60; // 1 hour

function signToken(id) {
  return jwt.sign({id: id}, SECRET, { expiresInMinutes: EXPIRES });
}

function isAuthenticated() {
  return compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        //if(req.query && req.query.hasOwnProperty('access_token')) {
        //  req.headers.authorization = 'Bearer ' + req.query.access_token;
        //}
        //validateJwt(req, res, next);
        console.log(req.headers.authorization);
        var decoded = jwt.verify(req.headers.authorization, SECRET);
        console.log(decoded)
      })
      // Attach user to request
      //.use(function(req, res, next) {
      //  User.findById(req.user._id, function (err, user) {
      //    if (err) return next(err);
      //    if (!user) return res.send(401);
      //
      //    req.user = user;
      //    next();
      //  });
      //});
}


exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;
