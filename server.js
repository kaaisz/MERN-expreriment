// file for entry point

// prepare express and mongoose
const express = require('express');
const mongoose = require('mongoose')

// route by importing files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB through mongoose
mongoose
  .connect(db)
  // if it's successfully connected - then, unsuccessful - catch:
  .then(() => console.log('MongoDB connected'))
  // if the authentication failed or some other error has found out, throw error message
  .catch(err => console.log(err));

// we're gonna wanna create just a simple route to get something up and and running
// we'll be putting our routes in different files using the express route.
// for the first time, we'd love to appear the home page.
// put route directory, then request and response objects as parameters
app.get('/', (req, res) => 
  // {});
  res.send('Hello, express with node.js')
);

// Use routes
app.use('/api/users/', users);
app.use('/api/profile/', profile);
app.use('/api/posts/', posts);

// to run the server either (in this case with Heroku), or locally
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));