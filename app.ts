import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Routes
// import authRoutes from './routes/auth.routes';
// import taskRoutes from './routes/task.routes';
// import projectRoutes from './routes/project.routes';
// import adminRoutes from './routes/admin.routes';

const app: Application = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/admin', adminRoutes);

export default app;
