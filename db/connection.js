const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect("mongodb://localhost/pagination", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = dbConnection;
