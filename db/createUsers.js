const mongoose = require("mongoose");
const User = require("../models/User");
const db = mongoose.connection;

function createUsers() {
  db.once("open", async () => {
    if ((await User.countDocuments().exec()) > 0) return;

    Promise.all([
      User.create({ name: "User 1" }),
      User.create({ name: "User 2" }),
      User.create({ name: "User 3" }),
      User.create({ name: "User 4" }),
      User.create({ name: "User 5" }),
      User.create({ name: "User 6" }),
      User.create({ name: "User 7" }),
      User.create({ name: "User 8" }),
      User.create({ name: "User 9" }),
      User.create({ name: "User 10" }),
      User.create({ name: "User 11" }),
      User.create({ name: "User 12" }),
      User.create({ name: "User 13" }),
      User.create({ name: "User 14" }),
    ]).then(() => console.log("added users"));
  });
}

module.exports = createUsers;
