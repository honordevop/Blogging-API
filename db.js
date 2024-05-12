const mongoose = require("mongoose");
require("dotenv").config();

module.exports = (MONGODB_URI) => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((err) => {
      console.log("An error occurred while connecting to MongoDB");
      console.log(err);
    });
};

//MONGODB_URI = 'mongodb://localhost:27017/blogs'
