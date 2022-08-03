const dateFormat = require("../utils/dateFormat");
const { Schema, model, Types } = require("mongoose");

const ThoughtSchema = new Schema(
  {
    // set custom id to avoid confusion with parent Thought's _id field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ReactionSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    ThoughtBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // use ThoughtSchema to validate data for a reply
    replies: [ThoughtSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ReactionSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Thought = model("Thought", ReactionSchema);

module.exports = Thought;
// export thought schema
module.exports = ThoughtSchema;
