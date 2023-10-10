const router = require('express').Router();

const userRoutes = require('./userRoutes');
const routineRoutes = require('./routineRoutes');

router.use('/users', userRoutes);
router.use('/routines', routineRoutes)

module.exports = router;