const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    // Encrypt The Password
    const { password, photoUrl, about, skills, firstName, lastName, emailId } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating a new instance of the User Model
    const user = new User({
      firstName,
      emailId,
      photoUrl,
      about,
      skills,
      lastName,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
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
      res.send(user);
    } else {
      throw new Error("Invalid login credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful");
});

module.exports = authRouter;
