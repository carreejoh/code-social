const router = require('express').Router();

const {
    getDayRoutines,
    createRoutine,
    getIndividualRoutine,
    getAllRoutines,
    nukeRoutine,
    editRoutine,
    deleteSomeRoutines
} = require('../../controllers/routineController')

router.route('/:username').get(getAllRoutines)
router.route('/nuke/:username/:routineId').delete(nukeRoutine)
router.route('/day').get(getDayRoutines);
router.route('/individ/:_id').get(getIndividualRoutine).put(editRoutine)
router.route('/create').post(createRoutine)
router.route('/delete/:username/:routineId').delete(deleteSomeRoutines)

module.exports = router;