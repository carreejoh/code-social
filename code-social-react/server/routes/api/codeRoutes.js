const router = require('express').Router();

const {
  postCode,
  getUsersCode,
//   updateCode,
//   deleteCode,
  getOneCode,
} = require('../../controllers/codeController');

router.route('/').post(postCode);
router.route('/:username').get(getUsersCode);
router.route('/single/:id').get(getOneCode);
// router.route('/:codeId').get(getOneCode);
// router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;