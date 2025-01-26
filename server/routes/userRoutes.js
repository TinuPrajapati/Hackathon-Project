import express from 'express';
import { allUsers, getUser, loginUser, logoutUser, registerUser, specificUsers, updateUser } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import {upload} from "../lib/cloudinary.js"
const router_user = express.Router();

// get request
router_user.get('/user',protectRoute,getUser)
router_user.get("/all",protectRoute,allUsers)
router_user.get('/:id',protectRoute,specificUsers)

// post request
router_user.post('/register',registerUser )
router_user.post('/login',loginUser )
router_user.post('/logout',protectRoute,logoutUser )

// put request
router_user.put('/update_user',protectRoute,upload.single("image"),updateUser)

export default router_user;