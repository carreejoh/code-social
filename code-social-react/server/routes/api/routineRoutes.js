const router = require('express').Router();

const {
    getDayRoutines,
    createRoutine,
    getIndividualRoutine,
    getAllRoutines,
    deleteRoutine
} = require('../../controllers/routineController')

router.route('/:username').get(getAllRoutines)
router.route('/nuke/:_id').delete(deleteRoutine)
router.route('/day').get(getDayRoutines);
router.route('/individ/:_id').get(getIndividualRoutine)
router.route('/create').post(createRoutine)

module.exports = router;