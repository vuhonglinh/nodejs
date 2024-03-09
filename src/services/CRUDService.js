const connection = require("../config/database.js");

const createUser = async (email, name, city) => {
  const [result, fields] = await connection.query(
    "INSERT INTO Users (email, name, city) VALUES (?, ?, ?)",
    [email, name, city]
  );
};

const getAllUsers = async () => {
  let [result, fields] = await connection.query("SELECT * FROM Users");
  return result;
};

const getUserById = async (id) => {
  const [result, fields] = await connection.query(
    "SELECT * FROM Users WHERE id = ?",
    [id]
  );
  return result && result.length > 0 ? result[0] : {};
};

const updateUserById = async (email, name, city, id) => {
  connection.query(
    "UPDATE Users SET email = ? , name = ? ,city = ? WHERE id = ?",
    [email, name, city, id]
  );
};

const deleteUserById = async (id) => {
  connection.query("DELETE FROM Users WHERE id = ?", [id]);
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
