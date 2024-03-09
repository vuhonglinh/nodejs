const Task = require("../models/task");
const aqp = require("api-query-params");
module.exports = {
  createTask: async (data) => {
    if (data.type === "CREATE-TASK") {
      return Task.create(data);
    } else if (data.type === "ADD-USER") {
      //find project by id
      let { taskId, type, ...result } = data;
      let task = await Task.updateOne({ _id: taskId }, result).exec();
      return task;
    } else if (data.type === "REMOVE-USERS") {
      //find project by id
      let project = await Task.findById(data.projectId).exec();
      project.usersInfo.pull(...data.usersArr);
      let result = await project.save();
      return result;
    }
  },

  getTasks: async (limit, page, queryString) => {
    if (limit && page) {
      let skip = (page - 1) * limit;
      const { filter } = aqp(queryString);
      return Task.find(filter).skip(skip).limit(limit).exec(); //Truyền vào populate(field) liên kết với bảng khác
    } else {
      return Task.find({}).exec();
    }
  },

  updateTaskById: async (data, id) => {
    try {
      return Task.updateOne({ _id: id }, data);
    } catch (err) {
      return err;
    }
  },

  deleteTaskById: async (id) => {
    try {
      return await Task.delete({ _id: id }); //Xóa mềm
    } catch (err) {
      return err;
    }
  },
};
