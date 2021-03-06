const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    groups: {
      type: Array,
      default: [],
    },
    state: {
      type: String,
    },
    isVerified: { type: Boolean, default: false },
    img:String
  },
 
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
