const User = require("../models/user.js");

const getHomePage = async (req, res) => {
  let result = await User.find({});
  return res.render("home", { listUsers: result });
};

const getCreatePage = (req, res) => {
  res.render("create");
};

const postCreateUser = async (req, res) => {
  let { email, name, city } = req.body;
  // await User.create({
  //   email: email,
  //   name: name,
  //   city: city,
  // });
  await User.create({
    //Khi không truyền key sẽ lấy tên làm key luôn => giá trị sẽ là giá trị thật
    email,
    name,
    city,
  });
  res.redirect("/");
};

const getUpdatePage = async (req, res) => {
  let { id } = req.params;
  const user = await User.findById(id).exec();
  res.render("edit", { user: user });
};

const postUpdateUser = async (req, res) => {
  let { email, name, city, id } = req.body;
  await User.updateOne({ _id: id }, { email: email, name: name, city: city });
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  let { id } = req.body;
  let result = await User.deleteOne({ _id: id });
  res.redirect("/");
};

module.exports = {
  getHomePage,
  getCreatePage,
  postCreateUser,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
};
