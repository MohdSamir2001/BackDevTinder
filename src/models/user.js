const mongoose = require("mongoose");
// User work as a class , we will create instances on the basis of this class
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});
// const User = mongoose.model("User", userSchema);
// module.exports = User;
module.exports = mongoose.model("User", userSchema);
