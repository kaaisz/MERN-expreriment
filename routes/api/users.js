// this user gonna hold or it's just gonna deal with authentication

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email from mongoose
  User.findOne({ email })
    .then(user => {
      // Check for user
      if(!user) {
        // If user doesn't exist, throw error status
        return res.status(404).json({ email: 'User not found' });
      }

      // Check Password by using bcrypt.compare()
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // If the password matched, user generate token
            res.json({ msg: 'Success' });
          } else {
            // If the password doesn't match
            return res.status(400).json({ password: 'Password incorrect' });
          }
        });
    })
    .catch()
});

// export the router
module.exports = router;