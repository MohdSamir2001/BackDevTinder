const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mohdsamirdb:%40mohdsamirdb103@myfirstcluster.m4xah.mongodb.net/devTinder"
  ); // %40 === @
};

module.exports = { connectDB };
