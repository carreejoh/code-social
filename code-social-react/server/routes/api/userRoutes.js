const router = require('express').Router();

const {
    getUser,
    getAllUsers,
    postUser,
    login,
    isLoggedIn,
    getUserById,
    updateStats,
    getUserStats
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(postUser);
router.route('/:username').get(getUser);
router.route('/userId/:id').get(getUserById);
router.route('/login').post(login);
router.route('/login/loggedIn').get(isLoggedIn);
router.route('/stats/:username').post(updateStats).get(getUserStats);

module.exports = router;