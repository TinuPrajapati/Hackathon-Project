import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { uploadClanImage } from '../lib/cloudinary.js';
import { addClan, deleteClan, getAllClans, getClan, updateClan } from '../controllers/clanControllers.js';
const router_clan = express.Router();

// get request
router_clan.get('/all', protectRoute,getAllClans);
router_clan.get('/:name', protectRoute,getClan);

// post request
router_clan.post('/add', protectRoute,uploadClanImage.single('image'),addClan);

// put request
router_clan.put('/update', protectRoute,uploadClanImage.single('image'),updateClan);

// delete request
router_clan.delete('/delete/:id', protectRoute,deleteClan);

export default router_clan;