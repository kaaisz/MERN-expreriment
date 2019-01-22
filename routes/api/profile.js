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


// @route    POST api/profile
// @desc     Post - Create or edit user profile
// @access   Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    
    // general profile
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // skills - split into array
    if(typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(','); // split into array
    };

    // Social
    profileFields.social = {}; // To link up with the object on profile.js
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    profile.findOne({ user: req.user.id })
      .then(profile => {
        if(profile) {
          // update
          Profile.findOneAndUpdate(
            { user: req.user.id }, 
            { $set: profileFields }, 
            { new: true }
          )
          .then(profile => res.json(profile));
        } else {
          // Create

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if(profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }

              // Save profiles
              new Profile(profileFields).save
                .then(profile => res.json(profile));
            })
        }
      })
  }
);

// export the router
module.exports = router;