import api from "../utils/apiConfig";

const registerUser = (formData = {}) => {
  return api.post("/auth/signup", { ...formData });
};

const loginUser = (formData = {}) => {
  return api.post("/auth/login", { ...formData });
};

const currentUser = () => {
  return api.get("/auth/current-user");
};

const refreshToken = () => {
  return api.post("/auth/refresh-token");
};

const logout = () => {
  return api.post("/auth/logout");
};

export { registerUser, loginUser, currentUser, refreshToken, logout };
