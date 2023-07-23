const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  birthday: {
    type: String,
  },
  password: {
    type: String,
  },
  
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
