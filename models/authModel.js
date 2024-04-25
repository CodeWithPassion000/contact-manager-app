const mongoose = require('mongoose');

const authSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the user'],
    },
    email: {
      type: String,
      required: [true, 'Please add the user email address'],
      unique: [true, 'Email address already registered'],
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model('Auth', authSchema);
