/* this profile is for add location, bio, sns and any other information 
which user can introduce to public*/

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');

// @route    GET api/profile/test
// @desc     Tests profile route
// @access   Public

// instead of app.js file, add the code below:
// you can access the URL "api/users/test" - see the code line of "use routes" on server.js
router.get('/test', (req, res) => res.json({msg: "Profile Works"})); // output will be with json


// @route    GET api/profile
// @desc     Get current users profile
// @access   Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err));
});

// export the router
module.exports = router;