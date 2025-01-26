// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
// import main from './lib/dbConfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router_user from './routes/userRoutes.js';
import router_reports from './routes/reportsRoutes.js';
import router_clan from './routes/clanRoutes.js';
import router_project from './routes/projectRoutes.js';
// import { app, server } from './lib/socket.js';
import router_msg from './routes/messageRoutes.js';
import mcqRoutes from './routes/mcqRoutes.js';
import squadRoutes from './routes/squadRoutes.js';
import { protectRoute } from './middleware/authMiddleware.js';
import { check } from './controllers/userController.js';

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(process.env.dbURI);
    console.log('Connected to the database');
  } catch (error) {
    console.log('Error connecting to the database: ', error);
  }
}
main();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/check",protectRoute,check)

// Routes
app.use('/api/user', router_user);
app.use('/api/reports', router_reports);
app.use('/api/clan', router_clan);
app.use('/api/projects', router_project);
app.use('/api/messages', router_msg);
app.use('/api', mcqRoutes);
app.use("/api/squads", squadRoutes);

// Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});
