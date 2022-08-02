const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
      // Must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts: {
     // Array of _id values referencing the Thought model
    },
    friends: {
     // Array of _id values referencing the User model (self-reference)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);
  // get total count of comments and replies on retrieval
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
  });

  // create the Pizza model using the UserSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;