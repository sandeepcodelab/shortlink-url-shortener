import api from "../utils/apiConfig";

const register = () => {
  return api.post("/auth/signup", { formData });
};

const login = (formData = {}) => {
  return api.post("/auth/login", { formData });
};

export { register, login };
