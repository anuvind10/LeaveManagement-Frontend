import { AuthProvider } from "@/context/AuthContext";
import { LoginPage } from "@/pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import RoleRoute from "@/routes/RoleRoute";
import { ThemeProvider } from "@/context/ThemeContext";
import AppLayout from "@/layouts/AppLayout";

const Placeholder = ({ name }: { name: string }) => (
  <div>{name} — coming soon</div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={<Placeholder name="Dashboard" />}
            />
            <Route
              path="/leave-requests"
              element={
                <RoleRoute allowedRoles={["Manager", "HR"]}>
                  <Placeholder name="Leave Requests" />
                </RoleRoute>
              }
            />
            <Route
              path="/leave-requests/my"
              element={<Placeholder name="My Leave Requests" />}
            />
            <Route
              path="/leave-requests/new"
              element={<Placeholder name="New Leave Request" />}
            />
            <Route
              path="/leave-requests/:id"
              element={<Placeholder name="Leave Request" />}
            />
          </Route>
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
