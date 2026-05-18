import api from "../utils/apiConfig";

const createShortUrl = (url) => {
  return api.post("/shorten", {
    originalUrl: url,
  });
};

const getdashboardInfo = () => {
  return api.get("/dashboard-info");
};

const getAllLinks = (params = {}) => {
  return api.get("/getAllLinks", { params });
};

export { createShortUrl, getdashboardInfo, getAllLinks };
