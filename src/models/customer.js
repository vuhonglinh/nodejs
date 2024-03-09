const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const customerSchema = new mongoose.Schema(
  {
    //Khai báo dự liệu bên trong
    name: { type: String, required: true },
    email: { type: String },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
    // statics: {
    //   findHoiDan(name) {
    //     return this.find({ name: new RegExp(name, "i") });
    //   },
    // },
  }
);
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
