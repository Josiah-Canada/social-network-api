const dateFormat = require('../utils/dateFormat');
const { Schema, model, Types } = require('mongoose');
const thoughtSchema = require('./thought')

const ReactionSchema = new Schema(
    {
      writtenBy: {
        type: String
      },
      ReactionBody: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ThoughtSchema to validate data for a reply
       replies: []
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;