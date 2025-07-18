import express from "express";
import { registerUser } from "../controllers/auth.controller";

const authRoutes = express.Router();

// @route   POST /api/auth/register
authRoutes.post("/register", registerUser);

export default authRoutes;
