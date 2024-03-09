const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: String,
  endDate: String,
});

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userInfo: userSchema,
    projectInfo: projectSchema,
    status: { type: String },
    startDate: { type: String },
    endDate: { type: String },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
