const User = require("../models/user.js");
const {
  uploadSingleFileApi,
  uploadMultipleFilesApi,
} = require("../services/fileService.js");
const getUsersApi = async (req, res) => {
  let result = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const createUserApi = async (req, res) => {
  let user = await User.create({ ...req.body });
  return res.status(201).json({
    errorCode: 0,
    data: user,
  });
};

const updateUserApi = async (req, res) => {
  let { email, name, city, id } = req.body;
  let user = await User.updateOne(
    { _id: id },
    { email: email, name: name, city: city }
  );
  return res.status(201).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserApi = async (req, res) => {
  let { id } = req.body;
  let result = await User.deleteOne({ _id: id });
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const uploadSingleApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  if (req.files.image.length > 1) {
    let result = await uploadMultipleFilesApi(req.files.image); //Lấy ra đối tượng file
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  }
  let result = await uploadSingleFileApi(req.files.image); //Lấy ra đối tượng file
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  uploadSingleApi,
};
