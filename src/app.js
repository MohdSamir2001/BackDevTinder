const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
// Handle Auth Middleware for all GET POST , .... requests
app.use("/admin", adminAuth);
app.use("/user", userAuth);
app.post("/user/login", (req, res, next) => {
  res.send("User logged in successfully");
});
app.get("/user/data", userAuth, (req, res, next) => {
  res.send("User Data Sent");
});
app.get("/admin/getAllData", (req, res, next) => {
  res.send("All Data Sent");
});
app.get("/admin/deleteUser", (req, res, next) => {
  res.send("Deleted a user");
});
app.listen(7860, () => {
  console.log("Server is sucessfully listening on port 7860");
});
