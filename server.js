/// -- file for entry point -- ///
// prepare express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// extra safe
mongoose.connect("mongodb://suzy:suzy123@ds161724.mlab.com:61724/mern-experiment", { useNewUrlParser: true })
  .then(() => console.log("connected to the database"))
  .catch(err => console.log(err));

// route by importing files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB through mongoose
mongoose
  .connect(db)
  // if it's successfully connected - then, unsuccessful - catch:
  .then(() => console.log('MongoDB connected'))
  // if the authentication failed or some other error has found out, throw error message
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config - there's a way of authentication which is using Google, FB, ig, 
// but in this case we'll use jwt
require('./config/passport')(passport);// path in the passport itself

// Use routes
app.use('/api/users/', users);
app.use('/api/profile/', profile);
app.use('/api/posts/', posts);

// to run the server either (in this case with Heroku), or locally
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));