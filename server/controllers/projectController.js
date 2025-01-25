import {cloudinary} from "../lib/cloudinary.js";
import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, link, mode } = req.body;
    const user = req.user.userId;
    let path = req.file?.path || "";
    let filename = req.file?.filename || "";

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
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "name email");
    res.status(200).json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate("user", "name email");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, link, mode } = req.body;
  const user = req.user.userId;
  let path = req.file?.path || "";
  let filename = req.file?.filename || "";

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    if (req.file && project.filename) {
      await cloudinary.uploader.destroy(project.filename);
    }

    const updateProjectDetails = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        projectImage: path,
        filename,
        link,
        mode,
        user,
      },
      { new: true,runValidators: true }
    );

    res.status(200).json(updateProjectDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.filename) {
      await cloudinary.uploader.destroy(project.filename);
    }

    await project.deleteOne();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
