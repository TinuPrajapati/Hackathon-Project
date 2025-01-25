// This routes only work for two person meassages not group messages
import express from "express";
const router_msg = express.Router();
import { protectRoute } from "../middleware/authMiddleware.js";
import { uploadMsgImage } from "../lib/cloudinary.js";

// get Route
router_msg.get("/:id",protectRoute)

// post Route
router_msg.post("/send/:id",protectRoute,uploadMsgImage.single("image"))

export default router_msg;