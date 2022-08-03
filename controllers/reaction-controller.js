const Thought = require("../models/thought");
const Reaction = require("../models/reaction");

const ReactionController = {
  // add Reaction to Thought
  addReaction({ params, body }, res) {
    console.log(body);
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.ThoughtId },
          { $push: { Reactions: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  addReply({ params, body }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.ReactionId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove Reaction
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.ReactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res.status(404).json({ message: "No Reaction with this id!" });
        }
        return Thought.findOneAndUpdate(
          { _id: params.ThoughtId },
          { $pull: { Reactions: params.ReactionId } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove reply
  removeReply({ params }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.ReactionId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent Reaction _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
      required: true,
    },
    writtenBy: {
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
      getters: true,
    },
  }
);

module.exports = ReactionController;
