const express = require("express");
const app = express();
// request handler function

app.use("/frontend/react", (req, res) => {
  res.send("We will use react in frontend");
});
app.use("/backend/nodejs", (req, res) => {
  res.send("We will use nodejs in backend");
});
app.get("/user", (req, res) => {
  res.send({ firstName: "Mohd", lastName: "Samir" });
});
app.delete("/user", (req, res) => {
  res.send("Data Delete Successfully");
});
app.patch("/user", (req, res) => {
  res.send("Update Data Successfully");
});
app.post("/user", (req, res) => {
  res.send({ firstName: "Zaid", lastName: "Saifi" });
});
app.use("/frontend", (req, res) => {
  res.send("Hello from frontend");
});
app.use("/backend", (req, res) => {
  res.send("Hello from backend");
});
app.use("/", (req, res) => {
  res.send("Mohd Samir");
});
app.listen(7860, () => {
  console.log("Server is sucessfully listening on port 7860");
});
