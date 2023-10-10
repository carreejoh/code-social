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
      const user = await User.create(req.body);
      const token = signToken(user);
      res.status(200).json({token});
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
      res.status(200).json({token});
    } catch (err) {
      console.error(err);
    }
  },

  //   async logout(req, res) {
  //     try {
  //       if (req.session.loggedIn) {
  //         req.session.destroy(() => {
  //           res.status(200).end();
  //         });
  //       } else {
  //         res.status(404).end();
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       res.status(500).json(e);
  //     }
  //   },

  async isLoggedIn(req, res) {
    try {
      if (req.session.loggedIn) {
        let user = req.session.username;
        res.json("loggedin");
        return;
      } else {
        res.json("none")
        return;
      }
    } catch (err) {
      console.error(err);
    }
  },

  //   async unknown(req, res) {
  //     try {
  //       if (req.session.loggedIn) {
  //         let user = req.session.username;
  //         res.json(user);
  //       } else {
  //         res.json("No User Found");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   },

  // //   async addLikedPost(req, res) {
  // //     try {
  // //       const post = await Post.findOne({ _id: req.body.postId }).exec();
  // //       const user = await User.findOneAndUpdate(
  // //         { username: req.body.username },
  // //         { $push: { likes: post._id } },
  // //         { new: true }
  // //       ).exec();
  // //       if (!user) {
  // //         res.json({ message: "No user found" });
  // //         return;
  // //       }
  // //       res.json(post);
  // //     } catch (e) {
  // //       console.error(e);
  // //     }
  // //   },

  //   async getUserLikes(req, res) {
  //     try {
  //       const likes = await User.find({ username: req.params.username }).select(
  //         "likes"
  //       );
  //       res.json(likes);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   },

  //   async deleteUserLikes(req, res) {
  //     try {
  //         const user = await User.findOneAndUpdate(
  //             { username: req.body.username },
  //             { $pull: { likes: req.body.postId }}
  //             );
  //         if(!user) {
  //             return res.status(404).json({ message: "No code with that ID" });
  //         }
  //         res.json(user);
  //     } catch (err) {
  //         console.error(err)
  //     }
  //   },
};
