import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
