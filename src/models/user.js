const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //Khai báo dự liệu bên trong
  name: String,
  email: String,
  city: String,
});
const User = mongoose.model("user", userSchema);

module.exports = User;
