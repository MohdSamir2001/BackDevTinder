const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
connectDB()
  .then(() => {
    console.log("Database connection is established");
    app.listen(7860, () => {
      console.log("Server is sucessfully listening on port 7860");
    });
  })
  .catch((err) => {
    console.error("Database connot be connected");
  });
