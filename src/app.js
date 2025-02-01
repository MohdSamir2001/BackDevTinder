const express = require("express");
const app = express();
// request handler function
app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("Handling The Route User 1");
      next();
      // res.send("Response 1");
    },
    (req, res, next) => {
      console.log("Handling The Route User 2");
      // res.send("Response 2");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Handling The Route User 3");
    // res.send("Response 3");
    next();
  },
  (req, res, next) => {
    console.log("Handling The Route User 4");
    res.send("Response 4");
  }
);
app.listen(7860, () => {
  console.log("Server is sucessfully listening on port 7860");
});
