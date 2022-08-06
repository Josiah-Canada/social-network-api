const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

// var validateEmail = function(email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email)
// };

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], 
      
      // Must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts: [ Schema.Types.ObjectId ],
      
     // Array of _id values referencing the Thought model
    
    friends: [Schema.Types.ObjectId]
     // Array of _id values referencing the User model (self-reference)
  
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
    return this.friends.length;
  });

  // create the Pizza model using the UserSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;