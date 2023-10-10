// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');

// // Import the two parts of a GraphQL schema
// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 5050;
// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async () => {
// await server.start();
// server.applyMiddleware({ app });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   })
// })
// };

// // Call the async function to start the server
// startApolloServer();


















// MONGOOSE / EXPRESS / NODE SERVER

const path = require("path");
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const session = require("express-session");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5050;
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

