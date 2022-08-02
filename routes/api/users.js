const {
    addUser,
    removeUser,
    updateUser
  } = require('../../controllers/comment-controller');

const router = require('express').Router();


router
  .route('/:userId/')
  .delete('/:userId')
  .put(':/userId')

router.route('/:userId/').put(updateUser)

// /api/comments/<userId>
router.route('/:userId').post(addUser);

// /api/comments/<userId>/<commentId>
router.route('/:userId/').delete(removeUser);


module.exports = router;