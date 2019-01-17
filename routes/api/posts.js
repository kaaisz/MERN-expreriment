// this file is for post and comments

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();

// @route    GET api/posts/test
// @desc     Tests posts route
// @access   Public

// instead of app.js file, add the code below:
// you can access the URL "api/users/test" - see the code line of "use routes" on server.js
router.get('/test', (req, res) => res.json({msg: "posts Works"})); // output will be json

// export the router
module.exports = router;