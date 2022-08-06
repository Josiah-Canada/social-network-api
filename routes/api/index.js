const router = require("express").Router();
const userRoutes = require("./users");
const thoughtsRoutes = require("./thoughts");
const { createReaction } = require("../../controllers/reaction-controller");

router.route("/").post(createReaction);

router.use("/users", userRoutes);
router.use("/thoughts", thoughtsRoutes);

module.exports = router;
