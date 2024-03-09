const {
  createProject,
  getProjects,
  updateUpdateById,
  deleteProjectById,
} = require("../services/projectService.js"); //Lấy CRUD bên service

module.exports = {
  createProjectApi: async (req, res) => {
    let { ...data } = req.body;
    let projects = await createProject(data);
    return res.status(200).json({
      statusCode: 200,
      data: projects,
    });
  },

  getProjectsApi: async (req, res) => {
    let { limit, page, ...queryString } = req.query;
    let projects = await getProjects(limit, page, queryString);
    return res.status(200).json({
      statusCode: 200,
      data: projects,
    });
  },

  updateProjectApi: async (req, res) => {
    let { id, ...data } = req.body;
    let projects = await updateUpdateById(data, id);
    return res.status(201).json({
      errorCode: 0,
      data: projects,
    });
  },

  deleteProjectApi: async (req, res) => {
    let { id } = req.body;
    let reslut = await deleteProjectById(id);
    return res.status(201).json({
      errorCode: 0,
      data: reslut,
    });
  },
};
