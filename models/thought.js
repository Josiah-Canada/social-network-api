const dateFormat = require("../utils/dateFormat");
const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    // set custom id to avoid confusion with parent Thought's _id field
     thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1
    },
    username: {
      type: String,
      required: true,
    },
    reactions:  [ReactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
      virtual: true,

    },
  }
);

ThoughtSchema.virtual("reactionCount").get(function() {
return this.reactions.length
})

const Thought = model("Thought", ThoughtSchema);


module.exports = Thought;

