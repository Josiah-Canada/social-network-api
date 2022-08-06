const Reaction = require("../models/thought");

const reactionController = {
  createReaction({ body }, res) {
    Reaction.create(body)
      .then((dbReactionData) =>
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { reactions: dbReactionData._id } },
          { new: true }
        )
      )
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = reactionController;
