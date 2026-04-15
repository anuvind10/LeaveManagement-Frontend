import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types/auth";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type RoleRouteProps = PropsWithChildren<{
  allowedRoles: Role[];
}>;

export default function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
