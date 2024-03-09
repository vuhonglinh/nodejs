const Customer = require("../models/customer.js");
const Joi = require("joi");
const { uploadSingleFileApi } = require("../services/fileService.js");
const {
  getAllCustomers,
  createCustomer,
  createCustomerArr,
  updateCustomerById,
  deleteCustomerById,
  deleteCustomerArr,
} = require("../services/customerService.js"); //Lấy CRUD bên service

module.exports = {
  getCustomersApi: async (req, res) => {
    let { limit, page, ...queryString } = req.query;
    let customers = await getAllCustomers(limit, page, queryString);
    return res.status(200).json({
      statusCode: 200,
      data: customers,
    });
  },

  createCustomerApi: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

    //Validation
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),

      address: Joi.string().required(),

      phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")).required(),

      email: Joi.string().email().required(),

      description: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error });
    }
    let image = "";
    if (req.files && Object.keys(req.files).length > 0) {
      let fileName = await uploadSingleFileApi(req.files.image);
      image = fileName.path;
    }
    data = { ...req.body, image };
    let customer = await createCustomer(data);
    return res.status(201).json({
      errorCode: 0,
      data: customer,
    });
  },
  createCustomerArrApi: async (req, res) => {
    let customers = await createCustomerArr(req.body.customers);
    if (customers) {
      return res.status(201).json({
        errorCode: 0,
        data: customers,
      });
    } else {
      return res.status(404).json({
        errorCode: 1,
        data: customers,
      });
    }
  },

  updateCustomerApi: async (req, res) => {
    let { id, ...data } = req.body;
    let customer = await updateCustomerById(data, id);
    return res.status(201).json({
      errorCode: 0,
      data: customer,
    });
  },

  deleteCustomerApi: async (req, res) => {
    let { id } = req.body;
    let reslut = await deleteCustomerById(id, true);
    return res.status(201).json({
      errorCode: 0,
      data: reslut,
    });
  },

  deleteCustomerArrApi: async (req, res) => {
    let data = req.body.customersId;
    let result = await deleteCustomerArr(data);
    return res.status(201).json({
      errorCode: 0,
      data: result,
    });
  },
};
