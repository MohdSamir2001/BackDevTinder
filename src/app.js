const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const { userAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    // user is present in the database or not
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    // check password is validate or not
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // now everything is checked , it means a authorized user request the server
      // create a jwt token
      const token = await user.getJWT();
      // userId hided in this token
      // secret key only knows the server
      // add token to cookies and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
      });
      res.send("Logged in successfully");
    } else {
      throw new Error("Invalid login credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User does not exist");
    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});
app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    // Encrypt The Password
    const { password, firstName, lastName, emailId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating a new instance of the User Model
    const user = new User({
      firstName,
      emailId,
      lastName,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length === 0) res.status(404).send("User not found");
    else res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  const ALLOWED_UPDATES = ["userId", "photoURL", "about", "skills"];
  try {
    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    // const user = await User.findByIdAndUpdate({ _id: userId }, data); // default is before
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User data updated sucessfully");
    // console.log(user);
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // await User.findByIdAndDelete({ _id: userId });
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // Sending a connection request
  const user = req.user;
  res.send(user.firstName + " sent the request");
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
