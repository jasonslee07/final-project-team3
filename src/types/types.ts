import type { User } from "firebase/auth";

export type UserRole = "Client" | "Vendor";

export interface UserData {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}
