import { cloudinary } from "../lib/cloudinary.js";
import Project from "../models/projectModels.js";
import User from "../models/userModels.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, link, mode } = req.body;
    const user = req.user.userId;
    let path = "https://img.freepik.com/free-photo/project-plan-program-activity-solution-strategy-concept_53876-15827.jpg?t=st=1737881778~exp=1737885378~hmac=6a6736b01fc18ad20b1bdb75ba24cabd231a46cea0f19384eab463911d0d013d&w=740"
    let filename = ""
    if(req.file){
      path = req.file.path
      filename = req.file.filename
    }
    

    const existUser = await User.findById(user);
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

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

    res.status(201).json({ message: "Project Created Successfully", project });
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "name email");
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
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
    console.error("Error fetching project:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, link, mode } = req.body;
  const user = req.user.userId;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure only the owner can update
    if (project.user.toString() !== user) {
      return res.status(403).json({ message: "Unauthorized to update this project" });
    }

    let path = req.file?.path || project.projectImage || "";
    let filename = req.file?.filename || project.filename || "";

    // Delete old image if a new one is uploaded
    if (req.file && project.filename) {
      await cloudinary.uploader.destroy(project.filename);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, projectImage: path, filename, link, mode, user },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    console.error("Error updating project:", error.message);
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

    // Delete Cloudinary image if it exists
    if (project.filename) {
      try {
        await cloudinary.uploader.destroy(project.filename);
      } catch (error) {
        console.error("Cloudinary deletion error:", error);
      }
    }

    await project.deleteOne();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
