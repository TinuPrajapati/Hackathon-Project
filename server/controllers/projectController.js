import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, link, mode } = req.body;
    const user = req.user.userId;
    let path = req.file ? req.file.path : "";
    let filename = req.file ? req.file.filename : "";

    const existUser = await User.findById(user);
    const project = await Project.create({
      title,
      description,
      projectImage: path,
      filename,
      link,
      mode,
      user,
    });
    existUser.projects.push(project._id);
    await existUser.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "username email");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate("user", "username email");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const project = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
