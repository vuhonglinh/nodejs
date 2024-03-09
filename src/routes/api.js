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

const {
  createProjectApi,
  getProjectsApi,
  updateProjectApi,
  deleteProjectApi,
} = require("../controllers/projectController.js");

const {
  createTaskApi,
  getTasksApi,
  updateTaskApi,
  deleteTaskApi,
} = require("../controllers/taskController.js");
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

//Khai báo projects
routerApi.post("/projects", createProjectApi);
routerApi.get("/projects", getProjectsApi);
routerApi.put("/projects", updateProjectApi);
routerApi.delete("/projects", deleteProjectApi);

//Khai báo tasks
routerApi.post("/tasks", createTaskApi);
routerApi.get("/tasks", getTasksApi);
routerApi.put("/tasks", updateTaskApi);
routerApi.delete("/tasks", deleteTaskApi);

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
