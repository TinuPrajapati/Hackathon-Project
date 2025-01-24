import express from 'express';
import { getUser, loginUser, logoutUser, registerUser, updateUser } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import {uploadStudentImage} from "../lib/cloudinary.js"
const router_user = express.Router();

// get request
router_user.get('/user',protectRoute,getUser)

// post request
router_user.post('/register',registerUser )
router_user.post('/login',loginUser )
router_user.post('/logout',protectRoute,logoutUser )

// put request
router_user.put('/update_user',protectRoute,uploadStudentImage.single("image"),updateUser)

export default router_user;