// file for entry point
const express = require('express');

const app = express();

// we're gonna wanna create just a simple route to get something up and and running
// we'll be putting our routes in different files using the express route.
// for the first time, we'd love to appear the home page.
// put route directory, then request and response objects as parameters
app.get('/', (req, res) => 
  // {});
  res.send('Hello, express')
);

// to run the server either (in this case with Heroku), or locally
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));