const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true,
  },
  // name and avatar wanna separate with user account,
  // Because we wanna leave comment even if the users delete their account
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  // we wanna just add Like button just like as an switch
  likes: [
    {
      user: {
        // Add same data with user above
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    },
  ],
  // comment will also have the user which assosiated with it
  // Add same data with user above
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  // date for post
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);