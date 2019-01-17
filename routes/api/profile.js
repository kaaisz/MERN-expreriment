/* this profile is for add location, bio, sns and any other information 
which user can introduce to public*/

// import express, because using the router needs to bring express
const express = require('express');
const router = express.Router();

// @route    GET api/profile/test
// @desc     Tests profile route
// @access   Public

// instead of app.js file, add the code below:
// you can access the URL "api/users/test" - see the code line of "use routes" on server.js
router.get('/test', (req, res) => res.json({msg: "Profile Works"})); // output will be with json

// export the router
module.exports = router;