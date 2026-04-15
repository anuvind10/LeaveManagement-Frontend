import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}
