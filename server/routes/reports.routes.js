import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addReport, allReports, getReports } from '../controllers/reports.controllers.js';
const router_reports = express.Router();

// get request
router_reports.get('/:username',protectRoute,getReports );
router_reports.get('/',protectRoute,allReports );

// post request
router_reports.post('/add',protectRoute,addReport );

export default router_reports;