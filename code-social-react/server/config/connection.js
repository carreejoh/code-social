const mongoose = require('mongoose');

require('MONGODB_URI').config();

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI || 'mongodb://127.0.0.1:27017/RoutineDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose.connection;

