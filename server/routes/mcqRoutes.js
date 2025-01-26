const express = require("express");
const { generateMCQ } = require("../controllers/mcqController");

const router = express.Router();

router.post("/generate-mcq", generateMCQ);

module.exports = router;
