const { User, Code } = require("../models");

module.exports = {
  async getOneCode(req, res) {
    try {
      const code = await Code.findOne({ _id: req.params.id });
      if (!code) {
        return res.status(404).json({ message: "No code with that ID!" });
      }
      res.json(code);
    } catch (err) {
      console.error(err);
    }
  },

  async getUsersCode(req, res) {
    try {
        const code = await Code.find({ username: req.params.username })
        if(!code) {
            res.status(404).json({ message: "This user has no code"})
        }
        res.json(code);
    } catch (err) {
      console.error(err);
    }
  },

  async postCode(req, res) {
    try {
      const code = await Code.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { codeSnips: code._id } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Code saved, but no User found" });
      }
      res.json(code);
    } catch (err) {
      console.error(err);
    }
  },

  // // async getCodeIds(req, res) {
  // //     try {
  // //         const code = await Code.find({}).select('id');
  // //         res.json(code);
  // //     } catch (err) {
  // //         console.error(err);
  // //     }
  // // },

  // async updateCode(req, res) {
  //     try {
  //         const code = await Code.findOneAndUpdate({ _id: req.body.codeId }, req.body)
  //         if(!code) {
  //             return res.json({message: "Sorry this code doesn't exist"});
  //         }
  //         res.json(code);
  //     } catch (err) {
  //         console.error(err);
  //     }
  // },

  // async deleteCode (req, res) {
  //     try {
  //         const code = await Code.deleteOne({ _id: req.body.codeId });
  //         const user = await User.findOneAndUpdate(
  //             { username: req.body.username },
  //             { $pull: { codeSnips: Code._id }}
  //             );
  //         if(!code) {
  //             return res.status(404).json({ message: "No code with that ID" });
  //         }
  //         res.json(user);
  //     } catch (err) {
  //         console.error(err)
  //     }
  // }
};
