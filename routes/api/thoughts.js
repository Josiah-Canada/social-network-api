const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

const {
  createReaction
 } = require("../../controllers/reaction-controller")

const router = require("express").Router();

router.route("/").get(getAllThoughts);

router.route("/").post(createThought);

router.route("/:id").get(getThoughtById);

router.route("/:id/").put(updateThought);

router.route("/:id/").delete(deleteThought);

router.route("/:id").post(createReaction)

module.exports = router;
