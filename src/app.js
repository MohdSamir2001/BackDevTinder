const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  try {
    // Logic of DB call and get user data
    throw new Error("bhaiyaerrorgenratehogayihai");
    res.send("User Data Sent");
  } catch (err) {
    res.status(500).send("Some error contact support team");
  }
});

app.listen(7860, () => {
  console.log("Server is sucessfully listening on port 7860");
});
