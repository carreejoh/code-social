const mongoose = require("mongoose");

require("dotenv").config();

// process.env.MONGODB_URI

// const mongooseURL = 'mongodb://127.0.0.1:27017/RoutineDB'

mongoose.connect(
  'mongodb://127.0.0.1:27017/RoutineDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
