const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User Model
  const user = new User({
    firstName: "Ansh",
    lastName: "Sharma",
    emailId: "anshsharma301@gmail.com",
    password: "iloveunikita",
  });
  // const user = new User(userObj);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

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
