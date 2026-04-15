import { decodeToken } from "@/lib/auth";
import type { AuthUser, LoginRequest } from "@/types/auth";
import { createContext, useContext, useState, type ReactNode } from "react";
import loginApi from "@/api/authApi";

interface AuthContextType {
  user: AuthUser | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    //Get the user on page load from localStorage
    const token = localStorage.getItem("token");
    return token ? decodeToken(token) : null;
  });

  const login = async (data: LoginRequest) => {
    const token = await loginApi(data);
    localStorage.setItem("token", token);
    const decodedUser = decodeToken(token);
    setUser(decodedUser);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
