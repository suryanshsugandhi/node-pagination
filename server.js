const express = require("express");
const app = express();
const User = require("./models/User");
const paginatedResults = require("./middleware/pagination");
const createUsers = require("./db/createUsers");
const dbConnection = require("./db/connection");

dbConnection();
createUsers();

app.get("/users", paginatedResults(User), (req, res) => {
  return res.json(res.paginatedResults);
});

app.listen(3000);
