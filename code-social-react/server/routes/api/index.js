const router = require('express').Router();

const userRoutes = require('./userRoutes');
const codeRoutes = require('./codeRoutes');
// const postRoutes = require('./postsRoutes')

router.use('/users', userRoutes);
router.use('/code', codeRoutes);
// router.use('/posts', postRoutes);

module.exports = router;