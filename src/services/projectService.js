const Project = require("../models/project");

const aqp = require("api-query-params");
module.exports = {
  createProject: async (data) => {
    if (data.type === "EMPTY-PROJECT") {
      return Project.create(data);
    } else if (data.type === "ADD-USER") {
      //find project by id
      let project = await Project.findById(data.projectId).exec();
      project.usersInfo.push(...data.usersArr);
      let result = await project.save();
      return result;
    } else if (data.type === "REMOVE-USERS") {
      //find project by id
      let project = await Project.findById(data.projectId).exec();
      project.usersInfo.pull(...data.usersArr);
      let result = await project.save();
      return result;
    } else if (data.type === "ADD-TASKS") {
      //find project by id
      let project = await Project.findById(data.projectId).exec();
      project.tasks.push(...data.tasksArr);
      let result = await project.save();
      return result;
    }else if (data.type === "REMOVE-TASKS") {
      //find project by id
      let project = await Project.findById(data.projectId).exec();
      project.tasks.pull(...data.usersArr);
      let result = await project.save();
      return result;
    }
  },

  getProjects: async (limit, page, queryString) => {
    if (limit && page) {
      let skip = (page - 1) * limit;
      const { filter } = aqp(queryString);
      console.log(queryString.populate);
      return Project.find(filter)
        .populate(queryString.populate)
        .skip(skip)
        .limit(limit)
        .exec(); //Truyền vào populate(field) liên kết với bảng khác
    } else {
      return Project.find({}).exec();
    }
  },

  updateUpdateById: async (data, id) => {
    try {
      return Project.updateOne({ _id: id }, data);
    } catch (err) {
      return err;
    }
  },

  deleteProjectById: async (id) => {
    try {
      return await Project.delete({ _id: id }); //Xóa mềm
    } catch (err) {
      return err;
    }
  },
};
