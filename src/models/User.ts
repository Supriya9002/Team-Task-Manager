import { Schema, model, Document } from "mongoose";
import { UserRole } from "../types/roles.enum";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole.USER | UserRole.ADMIN;
  isBanned: boolean;
  refreshTokens: string[];
}

const userSchema = new Schema()<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRole.USER, UserRole.ADMIN],
      default: UserRole.USER,
    },
    isBanned: { type: Boolean, default: false },
    refreshTokens: [{ type: String }],
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
