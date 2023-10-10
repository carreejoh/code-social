const router = require('express').Router();

const {
    getDayRoutines,
    createRoutine,
    getIndividualRoutine,
    getAllRoutines
} = require('../../controllers/routineController')

router.route('/:username').get(getAllRoutines)
router.route('/day').get(getDayRoutines);
router.route('/individ/:_id').get(getIndividualRoutine)
router.route('/create').post(createRoutine)

module.exports = router;