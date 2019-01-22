const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({

  // Add properties
  user: {
    type: Schema.types.ObjectId, // going to associate the user by its ID
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String, 
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // add [] because it's gonna be array of strings
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },

  // experience field
  experience: [
    { 
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean, // going to be a checkbox
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],

  // education field
  education: [
    { 
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: { 
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean, // going to be a checkbox
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],

  // social media links
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);