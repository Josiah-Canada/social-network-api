const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

const router = require("express").Router();

router.route("/").get(getAllThoughts);

router.route("/").post(createThought);

router.route("/:id").get(getThoughtById);

router.route("/:id/").put(updateThought);

router.route("/:id/").delete(deleteThought);

module.exports = router;