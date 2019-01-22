// this user gonna hold or it's just gonna deal with authentication

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/Login');

// Load user model
const User = require('../../models/User');

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public

// instead of app.js file, add the code below:
// you can access the URL "api/users/test" - see the code line of "use routes" on server.js
router.get('/test', (req, res) => res.json({msg: "Users Works"})); // output will be with json

// @route    GET api/users/register
// @desc     Register user
// @access   Public - otherwise you can't access!
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body); 
  //req.body includes everything you need - name, email, password, etc

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  // identify whether user exists
  User.findOne({ email: req.body.email })
    .then(user => {
       if(user) {
         return res.status(400).json({ email: 'Email already exists' });
       } else {
         // generate url for gravatar
         const avatar = gravatar.url(req.body.email, {
           s: '200', // Size
           r: 'pg', // Rating
           d: 'mm', // Default
         });

         // generate instance to add new data
         const newUser = new User({
           name: req.body.name,
           email: req.body.email,
           avatar,
           password: req.body.password,
         });

         // encrypt password by using bcrypt - in case of using bcryptjs
         bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
             if(err) throw err;
             newUser.password = hash;
             newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
           })
         })
       }
    })
});

// @route    GET api/users/login
// @desc     Login user / Returning JWT(json web token) token
// @access   Public - otherwise you can't access!
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body); 
  //req.body includes everything you need - name, email, password, etc

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email from mongoose
  User.findOne({ email })
    .then(user => {
      // Check for user
      if(!user) {
        // If user doesn't exist, throw error status
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      // Check Password by using bcrypt.compare()
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          // create token by using JSON web token and pass the data
          if(isMatch) {
            // If the password matched, user generate token
            const payload = { // Create JWT payload - which is including user information
              id: user.id, 
              name: user.name, 
              avatar: user.avatar, 
            }
            jwt.sign(
              payload, 
              keys.secretOrKey, // this is in keys.js (already imported by require('keys.js'))
              { expiresIn: 3600 }, // times until it expire (hour)
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token, // Bearer is the type of protocol
                })
              }
            );
          } else {
            // If the password doesn't match
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        });
    })
    .catch();
});

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get(
  '/current', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);


// export the router
module.exports = router;