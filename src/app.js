const express = require("express");
const app = express();
// request handler function
app.use("/frontend", (req, res) => {
  res.send("Hello from frontend");
});
app.use("/backend", (req, res) => {
  res.send("Hello from backend");
});
app.listen(7860, () => {
  console.log("Server is sucessfully listening on port 7860");
});
