

// MONGOOSE / EXPRESS / NODE SERVER
const next = require('next');
const path = require("path");
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const session = require("express-session");
const cors = require('cors');
const cookieParser = require("cookie-parser");

// const PORT = process.env.PORT || 5050;
const PORT = process.env.PORT || 5050
// const app = next({ dev: process.env.NODE_ENV !== 'production' });

const app = express();

const oneDay = 1000 * 60 * 60 * 24;

const sessionInstance = {
  secret: "zdMwutRaKNRGMemRwgUNaHIZv",
  cookie: { maxAge: oneDay },
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
app.use(cookieParser());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
