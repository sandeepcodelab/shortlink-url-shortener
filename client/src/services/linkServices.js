import api from "../utils/apiConfig";

const createShortUrl = (url) => {
  return api.post("/shorten", {
    originalUrl: url,
  });
};

const getAllLinks = () => {
  return api.get("/getAllLinks");
};

export { createShortUrl, getAllLinks };
