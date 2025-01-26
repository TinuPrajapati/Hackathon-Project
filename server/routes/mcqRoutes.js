import express from "express";
import { generateMCQ, submitAnswers } from "../controllers/mcqController.js";

const router = express.Router();

// Define routes
router.post("/generate-mcq", generateMCQ);
router.post("/submit-answers", submitAnswers);

export default router;
