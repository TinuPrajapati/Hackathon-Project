import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import main from './lib/dbConfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router_user from './routes/userRoutes.js';
import router_reports from './routes/reportsRoutes.js';
import router_clan from './routes/clanRoutes.js';
import router_project from './routes/projectRoutes.js';
import { app,server } from './lib/socket.js';
import router_msg from './routes/messageRoutes.js';
const mcqRoutes = require("./routes/mcqRoutes");

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
main();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/user",router_user)
app.use("/api/reports",router_reports)
app.use("/api/clan",router_clan)
app.use("/api/projects",router_project)
app.use("/api/messages",router_msg)
// Routes
app.use("/api/mcqgenrater", mcqRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
