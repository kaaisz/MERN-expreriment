const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// to search for the user which comes from payload
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// create empty objects for options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user){
            return done(null, user); // done is the parameter which is used in parameter
          }
          // if user isn't found
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
