const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const userSchema = new mongoose.Schema({
  //Khai báo dự liệu bên trong
  name: String,
  email: String,
  city: String,
});

userSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const User = mongoose.model("user", userSchema);

module.exports = User;
