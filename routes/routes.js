var express = require("express");
var router = express.Router();
var thoughtController = require("../controllers/thought-controller");
var reactionController = require("../controllers/reaction-controller");

router.get("/", function (req, res, next) {
  res.render("hey this worked");
});

router.get("/thoughts/reactions", function (req, res, next) {
  thoughtController.getAllThought(req, res);
});

router.post("/thoughts/reactions", function (req, res, next) {
  reactionController.addReaction(req, res);
});

module.exports = router;
