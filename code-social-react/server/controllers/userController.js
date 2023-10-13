const { User } = require("../models");
const cors = require("cors");
const { signToken } = require("../verify/auth");

module.exports = {
  async getUser(req, res) {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
        return res.status(400).json({ message: "User doesnt exist" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(400).json({ message: "User doesnt exist" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
    }
  },

  async postUser(req, res) {
    try {
      req.body.statSheet = {
        highOccured: 0,
        highestOccured: 0,
        highCompleted: 0,
        highestCompleted: 0,
        weekdayOccur: [0,0,0,0,0,0,0],
        weekdayCompleted: [0,0,0,0,0,0,0],
      }
      const user = await User.create(req.body);
      const token = signToken(user);
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ message: "Incorrect Username" });
      }
      if (user.password != req.body.password) {
        return res.status(404).json({ message: "Incorrect Password" });
      }
      const token = signToken(user);
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
    }
  },

  async isLoggedIn(req, res) {
    try {
      if (req.session.loggedIn) {
        let user = req.session.username;
        res.json("loggedin");
        return;
      } else {
        res.json("none");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  },

  // FOR STATS

  // async firstPostStats(req,res) {
  //   try{

  //   } catch(err) {
  //     console.error(err)
  //   }
  // },

  async updateStats(req, res) {
    try {
      const { highOc, highestOc, highComp, highestComp, weekOccurIndex, weekOccurIncre, weekCompIndex, weekCompIncre } = req.body
      const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { $inc: { 
          'statSheet.highOccured': highOc, 
          'statSheet.highestOccured': highestOc, 
          'statSheet.highCompleted': highComp,
           'statSheet.highestCompleted': highestComp,
           [`statSheet.weekdayOccur.${weekOccurIndex}`]: weekOccurIncre,
           [`statSheet.weekdayCompleted.${weekCompIndex}`]: weekCompIncre,
        } },
        { new: true }
      );
      if (!user) {
        res.status(400).json({ message: "No user found" });
      }
      res.json(user)
    } catch (err) {
      console.error(err);
    }
  },

  async getUserStats(req,res) {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
        res.status(400).json({ message: "No user found" });
      }
      res.json(user.statSheet)
    } catch (err) {
      console.error(err)
    }
  }


};
