const {
  createTask,
  getTasks,
  updateTaskById,
  deleteTaskById,
} = require("../services/taskService.js"); //Lấy CRUD bên service

module.exports = {
  createTaskApi: async (req, res) => {
    let { ...data } = req.body;
    let projects = await createTask(data);
    return res.status(200).json({
      statusCode: 200,
      data: projects,
    });
  },

  getTasksApi: async (req, res) => {
    let { limit, page, ...queryString } = req.query;
    let projects = await getTasks(limit, page, queryString);
    return res.status(200).json({
      statusCode: 200,
      data: projects,
    });
  },

  updateTaskApi: async (req, res) => {
    let { id, ...data } = req.body;
    let projects = await updateTaskById(data, id);
    return res.status(201).json({
      errorCode: 0,
      data: projects,
    });
  },

  deleteTaskApi: async (req, res) => {
    let { id } = req.body;
    let reslut = await deleteTaskById(id);
    return res.status(201).json({
      errorCode: 0,
      data: reslut,
    });
  },
};
