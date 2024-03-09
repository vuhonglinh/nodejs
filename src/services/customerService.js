const Customer = require("../models/customer");
const aqp = require("api-query-params");
module.exports = {
  getAllCustomers: async (limit, page, queryString) => {
    try {
      if (limit && page) {
        let skip = (page - 1) * limit;
        const { filter } = aqp(queryString);
        console.log(filter);
        return Customer.find(filter).skip(skip).limit(limit).exec();
      } else {
        return Customer.find({}).exec();
      }
    } catch (err) {
      return err;
    }
  },

  createCustomer: async (data) => {
    try {
      return Customer.create(data);
    } catch (err) {
      return null;
    }
  },

  createCustomerArr: async (data) => {
    try {
      return Customer.insertMany(data);
    } catch (err) {
      return err;
    }
  },

  getCustomerById: async (id) => {
    return Customer.find({ _id: id });
  },

  updateCustomerById: async (data, id) => {
    try {
      return Customer.updateOne({ _id: id }, data);
    } catch (err) {
      return err;
    }
  },

  deleteCustomerById: async (id) => {
    try {
      return await Customer.delete({ _id: id }); //Xóa mềm
    } catch (err) {
      return err;
    }
  },

  deleteCustomerArr: async (data) => {
    try {
      return await Customer.delete({ _id: { $in: data } });
    } catch (err) {
      return err;
    }
  },
};
