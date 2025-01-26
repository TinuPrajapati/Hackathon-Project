import express from "express";
import squadController from "../controllers/squadController.js";

const router = express.Router();

// Squad Routes
router.get("/", squadController.getAllSquads); // Get all squads
router.get("/:id", squadController.getSquadById); // Get a single squad by ID
router.post("/", squadController.createSquad); // Create a new squad
router.put("/:id", squadController.updateSquad); // Update a squad by ID
router.delete("/:id", squadController.deleteSquad); // Delete a squad by ID

export default router;
