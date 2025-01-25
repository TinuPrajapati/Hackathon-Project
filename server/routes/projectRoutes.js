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

// get requests
router_project.get("/",protectRoute, getAllProjects);
router_project.get("/:id",protectRoute, getProjectById);

// post requests
router_project.post("/add",protectRoute,uploadProjectImage.single("image"), createProject);

// put requests
router_project.put("/update_project/:id",protectRoute,uploadProjectImage.single("image"), updateProject);

// delete requests
router_project.delete("/delete_project/:id",protectRoute, deleteProject);

export default router_project;
