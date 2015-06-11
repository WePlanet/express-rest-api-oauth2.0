'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function () {
  passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {

        // 인증 정보 체크 로직
        if (email === 'test@test.com' && password === 'test') {
          var user = {id: 'user_1'};
          return done(null, user);
        } else {
          return done(null, false, { message: 'Fail to login.' });
        }
      }
  ));
};