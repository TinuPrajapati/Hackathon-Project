import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import main from './lib/dbConfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router_user from './routes/userRoutes.js';
import router_reports from './routes/reportsRoutes.js';
import router_clan from './routes/clanRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

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

// Routes
app.use('/api/user', router_user);
app.use('/api/reports', router_reports);
app.use('/api/clan', router_clan);
app.use('/api/projects', projectRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
