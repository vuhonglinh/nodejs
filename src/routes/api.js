const express = require("express");
const routerApi = express.Router(); //Hàm đinh tuyến
const {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  uploadSingleApi,
} = require("../controllers/apiController.js");

const {
  getCustomersApi,
  createCustomerApi,
  createCustomerArrApi,
  updateCustomerApi,
  deleteCustomerApi,
  deleteCustomerArrApi,
} = require("../controllers/customerController.js");

//Khai báo route 1
routerApi.get("/users", getUsersApi);
routerApi.post("/users", createUserApi);
routerApi.put("/users", updateUserApi);
routerApi.delete("/users", deleteUserApi);

//Khai báo route customers
routerApi.get("/customers", getCustomersApi);
routerApi.post("/customers", createCustomerApi);
routerApi.post("/customers-many", createCustomerArrApi);
routerApi.put("/customers", updateCustomerApi);
routerApi.delete("/customers", deleteCustomerApi);

routerApi.delete("/customers-many", deleteCustomerArrApi);

routerApi.get("/info", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    data: req.query,
  });
});

routerApi.get("/test/:name/:address", (req, res) => {
  console.log(req.params);
  res.status(200).json({
    data: req.params,
  });
});

routerApi.post("/file", uploadSingleApi);

module.exports = routerApi; //Xuất tất cả các router
