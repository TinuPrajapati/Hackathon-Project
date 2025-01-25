import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { uploadProjectImage } from "../lib/cloudinary.js";

const router_project = express.Router();

// Create a project
router_project.post("/add",protectRoute,uploadProjectImage.single("image"), createProject);

// Get all projects
router_project.get("/",protectRoute, getAllProjects);

// Get a single project by ID
router_project.get("/:id",protectRoute, getProjectById);

// Update a project
router_project.put("/:id",protectRoute,uploadProjectImage.single("image"), updateProject);

// Delete a project
router_project.delete("/:id",protectRoute, deleteProject);

export default router_project;
