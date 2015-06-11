'use strict';

var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = 'token_secret';
var EXPIRES = 60; // 1 hour
var validateJwt = require('express-jwt')({secret: SECRET});

function signToken(id) {
  return jwt.sign({id: id}, SECRET, { expiresInMinutes: EXPIRES });
}

function isAuthenticated() {
  return compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if(req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        req.user = {
          id: req.user.id,
          name: 'name of ' + req.user.id
        };
        next();
      });
}


exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;
