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

const deleteLinkData = (recordId) => {
  return api.delete(`/delete/${recordId}`);
};

export { createShortUrl, getdashboardInfo, getAllLinks, deleteLinkData };
