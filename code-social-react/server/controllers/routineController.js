const { Routine, User } = require("../models");

module.exports = {
  async getDayRoutines(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username }).select(
        req.body.dayOfWeek
      );
      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
    }
  },

  async getAllRoutines(req, res) {
    try {
      const user = await User.findOne({ username: req.params.username }).select(
        "sunday monday tuesday wednesday thursday friday saturday"
      );
      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
    }
  },

  async getIndividualRoutine(req, res) {
    try {
      const routine = await Routine.findById(req.params);
      res.json(routine);
    } catch (err) {
      console.error(err);
    }
  },

  // THIS ONLY CREATES ROUTINE FOR ONE DAY, MAKING IT VERY INEFFICIENT

  // async createRoutine(req,res) {
  //     try{
  //         const routine = await Routine.create(req.body);
  //         if(!routine) {
  //             return res.status(400).json({message: "Unable to create routine"})
  //         }
  //         const day = req.body.dayOfWeek;
  //         const user = await User.findOneAndUpdate(
  //             { username: req.body.username },
  //             { $push: { [day]: routine._id } },
  //             { new: true }
  //         )
  //         res.status(200).json(user)
  //     } catch (err) {
  //         console.error(err)
  //     }
  // },

  async createRoutine(req, res) {
    try {
      const routine = await Routine.create(req.body);
      if (!routine) {
        return res.status(400).json({ message: "Unable to create routine" });
      }
      const daysOfWeek = Array.isArray(req.body.dayOfWeek)
        ? req.body.dayOfWeek
        : [req.body.dayOfWeek];
      const updateOperations = daysOfWeek.reduce(
        (ops, day) => {
          ops[`$push`][day] = routine._id;
          return ops;
        },
        { $push: {} }
      );
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        updateOperations,
        { new: true }
      );
      if (!user) {
        return res.status(400).json({ message: "Unable to update user" });
      }
      return res
        .status(200)
        .json({ message: "Routine created and user updated" });
    } catch (err) {
      console.error(err);
    }
  },

  async deleteRoutine(req, res) {
    try {
      const routine = await Routine.findByIdAndDelete({ _id: req.params._id });
      if (!routine) {
        return res.status(400);
      }
      res.status(200).json({ message: "Routine deleted" });
    } catch (err) {
      console.error(err);
    }
  },
};
