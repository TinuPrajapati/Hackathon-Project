import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import main from './lib/dbconfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router_user from './routes/user.routes.js';
import router_reports from './routes/reports.routes.js';
import projectRoutes from "./routes/projectRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
main();

// cors
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/user",router_user)
app.use("/api/reports",router_reports)
app.use("/api/projects", projectRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
