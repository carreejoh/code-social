const { Routine, User } = require("../models");

module.exports = {
    async getDayRoutines(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username }).select(req.body.dayOfWeek);
            if(!user) {
                return res.status(400).json({message: "No user found"});
            }
            res.json(user);
        } catch (err) {
            console.error(err)
        }
    },

    async getAllRoutines(req,res) {
        try{
            const user = await User.findOne({ username: req.params.username}).select('sunday monday tuesday wednesday thursday friday saturday')
            if(!user) {
                return res.status(400).json({message: "No user found"})
            }
            res.json(user)
        } catch(err) {
            console.error(err)
        }
    },

    async getIndividualRoutine(req,res) {
        try{
            const routine = await Routine.findById(req.params)
            res.json(routine)
        } catch(err) {
            console.error(err)
        }
    },

    async createRoutine(req,res) {
        try{
            const routine = await Routine.create(req.body);
            if(!routine) {
                return res.status(400).json({message: "Unable to create routine"})
            }
            const day = req.body.dayOfWeek;
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { [day]: routine._id } },
                { new: true } 
            )
            res.status(200).json(user)
        } catch (err) {
            console.error(err)
        }
    },

   
}