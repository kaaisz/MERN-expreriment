// this file is for post and comments

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); // to protect roots

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route    GET api/posts/test
// @desc     Tests posts route
// @access   Public

// instead of app.js file, add the code below:
// you can access the URL "api/users/test" - see the code line of "use routes" on server.js
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' })); // output will be json



// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});



// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json(err)
    );
});




// @route    POST api/posts
// @desc     Create post
// @access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Initialize errors and is empty using destructuring 
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation - if isValid was false
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  // create instance by invoking required Post model
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    // avatar is from user state in react - redux is gonna keep that users info in state
    avatar: req.body.avatar,
    user: req.user.id,
  });

  newPost.save().then(post => res.json(post));
});



// @route    DELETE api/posts/:id
// @desc     Delete post
// @access   Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner - post has user fields
          if(post.user.toString() !== req.user.id){ 
            // needs to convert to string to compare both of them - 401 is unauthorized status
            return res.status(401).json({ notauthorized: 'User not authorized' });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});
// export the router
module.exports = router;