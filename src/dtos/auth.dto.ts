// auth.dto.ts

import { UserRole } from "../types/roles.enum";

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole.USER | UserRole.ADMIN;
}

export interface RegisterResponseDTO {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole.USER | UserRole.ADMIN;
  };
}
