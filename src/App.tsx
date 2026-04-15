import { AuthProvider } from "@/context/AuthContext";
import { LoginPage } from "@/pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import RoleRoute from "@/routes/RoleRoute";

const Placeholder = ({ name }: { name: string }) => (
  <div>{name} — coming soon</div>
);

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Placeholder name="Dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/leave-requests"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Manager", "HR"]}>
                <Placeholder name="Leave Requests" />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-requests/my"
          element={
            <ProtectedRoute>
              <Placeholder name="My Leave Requests" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-requests/new"
          element={
            <ProtectedRoute>
              <Placeholder name="New Leave Request" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-requests/:id"
          element={
            <ProtectedRoute>
              <Placeholder name="Leave Request" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
