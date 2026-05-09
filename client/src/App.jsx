import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { ToastProvider } from "./context/ToastProvider";
import Analytics from "./pages/Analytics";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";

export default function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<HomeLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>

              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/mylinks" element={<Analytics />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ModalProvider>
  );
}
