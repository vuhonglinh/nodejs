const express = require("express");
const router = express.Router(); //Hàm đinh tuyến
const {
  getHomePage,
  getCreatePage,
  postCreateUser,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser
} = require("../controllers/homeController.js");

//Khai báo route
router.get("/", getHomePage);

router.get("/create", getCreatePage);
router.post("/create-user", postCreateUser);

router.get("/update/:id", getUpdatePage);
router.post("/update-user", postUpdateUser);

router.post("/delete-user", postDeleteUser);

module.exports = router; //Xuất tất cả các router
