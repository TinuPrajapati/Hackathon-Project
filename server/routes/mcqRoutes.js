import express from "express"
const { generateMCQ } = require("../controllers/mcqController");

const router = express.Router();

router.post("/generate-mcq", generateMCQ);

export default router;
