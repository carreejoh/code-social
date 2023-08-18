const path = require("path");
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const session = require("express-session");
const cors = require('cors');

const PORT = process.env.PORT || 5050;
const app = express();

const sessionInstance = {
  secret: "zdMwutRaKNRGMemRwgUNaHIZv",
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  // credentials: true, 
}));
app.use(session(sessionInstance));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
