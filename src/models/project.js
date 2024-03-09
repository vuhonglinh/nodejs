const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
    customerInfo: customerSchema,
    usersInfo: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
    leader: userSchema,
    tasks: [{ type: mongoose.Schema.ObjectId, ref: "task" }],
  },
  {
    timestamps: true,
  }
);

projectSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
