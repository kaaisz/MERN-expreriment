// this user gonna hold or it's just gonna deal with authentication

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public

// instead of app.js file, add the code below:
// you can access the URL "api/users/test" - see the code line of "use routes" on server.js
router.get('/test', (req, res) => res.json({msg: "Users Works"})); // output will be with json

// export the router
module.exports = router;