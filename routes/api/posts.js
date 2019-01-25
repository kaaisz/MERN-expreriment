// this file is for post and comments

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// bring Post model
const Post = require('../../models/Post')

// Validation
const validatePostInput = require('../../validation/post');

// @route    GET api/posts/test
// @desc     Tests posts route
// @access   Public

// instead of app.js file, add the code below:
// you can access the URL "api/users/test" - see the code line of "use routes" on server.js
router.get('/test', (req, res) => res.json({msg: "posts Works"})); // output will be json



// @route    POST api/posts/test
// @desc     Create post
// @access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  // create instance by invoking required Post model
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar, 
    // avatar is from user state in react - redux is gonna keep that users info in state
    user: req.user.id,
  });

  newPost.save().then(post => res.json(post));
});

// export the router
module.exports = router;