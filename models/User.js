const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema with passing the objects
const UserSchema = new Schema({
  name: {
    type: String,
    required: true, // this is for add requirements
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// export file and link up with name and UserSchema
module.exports = User = mongoose.model('users', UserSchema);