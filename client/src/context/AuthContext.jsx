import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, refreshToken } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await currentUser();

        setUser(res.data.data.user);
      } catch (err) {
        if (err.status === 401) {
          try {
            await refreshToken();

            const res = await currentUser();
            setUser(res.data.data.user);
          } catch (error) {
            setUser(null);
          }
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
