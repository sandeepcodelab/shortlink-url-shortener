import api from "../utils/apiConfig";

const registerUser = (formData = {}) => {
  return api.post("/auth/signup", { ...formData });
};

const loginUser = (formData = {}) => {
  return api.post("/auth/login", { ...formData });
};

export { registerUser, loginUser };
