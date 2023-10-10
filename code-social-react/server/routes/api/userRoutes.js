const router = require('express').Router();

const {
    getUser,
    getAllUsers,
    postUser,
    login,
    isLoggedIn,
    getUserById
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(postUser);
router.route('/:username').get(getUser);
router.route('/userId/:id').get(getUserById);
router.route('/login').post(login);
router.route('/login/loggedIn').get(isLoggedIn);

module.exports = router;