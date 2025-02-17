const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequests");
const userRouter = express.Router();
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
// get all the pending connections requests for the logged In User
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // .populate("fromUserId" , ["firstName" , "lastName"])
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId; // Jise loggedInUser Ne Request Bheji Thi Aur Unhone Accepted Karli
      }
      return row.fromUserId; // Jin Logo Se LoggedInUser Ke Pass Requests Ayii Thi Aur LoggedInUser Ne Accepted Karli hai
    });
    res.json({
      message: "Data fetched successfully",
      data,
    });
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  // User should see all the user cards except
  // 1) His own card
  // 2) His connections
  // 3) Ignored People
  // 4) Already Sent to connection request to that person
  try {
    const loggedInUser = req.user;
    // Find all connections requests (sent + received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser._id, // it gives requests that user sent
        },
        {
          toUserId: loggedInUser._id, // it gives requests that user received
        },
      ],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId._id.toString());
      hideUsersFromFeed.add(req.toUserId._id.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA);
    res.send(users);
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});
module.exports = userRouter;
