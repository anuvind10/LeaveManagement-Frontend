import { useAuth } from "@/context/AuthContext";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteChildren = PropsWithChildren;

export default function PublicOnlyRoute({ children }: ProtectedRouteChildren) {
  const { user } = useAuth();
  if (user !== null) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
