const express = require("express");
const app = express();
// request handler function
// GET /users => middleware chain => request handlet
app.use("/", (req, res, next) => {
  // res.send("Handling / Route");
  next();
});
app.get("/user", (req, res, next) => {
  console.log("Handling the route user 1");
  res.send("First route handler");
  next();
});
app.get("/user", (req, res, next) => {
  console.log("Handling the route user 2");
  // res.send("Second route handler");
  // next();
});
app.listen(7860, () => {
  console.log("Server is sucessfully listening on port 7860");
});
