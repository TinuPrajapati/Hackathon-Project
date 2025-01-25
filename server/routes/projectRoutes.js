import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Create a project
router.post("/", createProject);

// Get all projects
router.get("/", getAllProjects);

// Get a single project by ID
router.get("/:id", getProjectById);

// Update a project
router.put("/:id", updateProject);

// Delete a project
router.delete("/:id", deleteProject);

export default router;
