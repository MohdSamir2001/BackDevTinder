const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const getSecureRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket) => {
    // Handle Events

    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = getSecureRoomId(userId, targetUserId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, photoUrl, text }) => {
        try {
          const roomId = getSecureRoomId(userId, targetUserId);
          // Save the message to the database
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
          io.to(roomId).emit("messageReceived", {
            photoUrl,
            text,
            firstName,
          });
        } catch (err) {
          console.log(err);
        }
      }
    ); 
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
