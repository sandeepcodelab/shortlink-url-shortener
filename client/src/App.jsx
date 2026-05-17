import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { ToastProvider } from "./context/ToastProvider";
import Analytics from "./pages/CreateLinks";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MyLinks from "./pages/MyLinks";
import CreateLinks from "./pages/CreateLinks";

export default function App() {
  return (
    <ModalProvider>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<HomeLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/createlinks" element={<CreateLinks />} />
                <Route path="/mylinks" element={<MyLinks />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ModalProvider>
  );
}
