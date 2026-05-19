import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, logout, refreshToken } from "../services/authService";
import { useNavigate } from "react-router";
import { useToast } from "./ToastProvider";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { notify } = useToast();

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await currentUser();

        setUser(res.data.data.user);
      } catch (err) {
        if (err.status === 401) setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // LogoutUser
  const userLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      notify.error(err.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: !!user, loading, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
