// app.ts
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./src/routes/auth.routes";

// Convert ES Module meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Application = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for uploaded files (if any)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Auth Route Enabled
app.use("/api/auth", authRoutes);

// Other routes (enable later when created)
// app.use('/api/tasks', taskRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/admin', adminRoutes);

export default app;
