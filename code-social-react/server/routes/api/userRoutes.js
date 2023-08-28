const router = require('express').Router();

// const {
//     getUser,
//     getAllUsers,
//     postUser,
//     signUp,
//     login,
//     logout,
//     unknown,
//     addLikedPost,
//     getUserLikes,
//     deleteUserLikes
// } = require('../../controllers/userController');

// router.route('/').get(getAllUsers).post(postUser);
// router.route('/find/:username').get(getUser);
// router.route('/login').post(login);
// router.route('/signup').post(signUp);
// router.route('/logout').post(logout);
// router.route('/unknown').get(unknown);
// router.route('/likes').post(addLikedPost).put(deleteUserLikes);
// router.route('/likes/:username').get(getUserLikes);

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