import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { UserRole } from "../types/roles.enum";
import { RegisterRequestDTO, RegisterResponseDTO } from "../dtos/auth.dto";

export const registerUser = async (
  req: Request<{}, {}, RegisterRequestDTO>,
  res: Response<RegisterResponseDTO | { message: string; error?: any }>
) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || UserRole.USER,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
