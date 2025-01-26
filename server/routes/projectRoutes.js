import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { upload } from "../lib/cloudinary.js";

const router_project = express.Router();

// GET requests
router_project.get("/", protectRoute, getAllProjects);
router_project.get("/:id", protectRoute, getProjectById);

// POST request - Handle single image upload
router_project.post(
  "/add",
  protectRoute,
  upload.single("image"),  // Expecting a field named "image"
  createProject
);

// PUT request - Handle image update as well
router_project.put(
  "/update_project/:id",
  protectRoute,
  upload.single("image"),  // Expecting a field named "image"
  updateProject
);

// DELETE request
router_project.delete("/delete_project/:id", protectRoute, deleteProject);

export default router_project;
