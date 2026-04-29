import api from "../utils/apiConfig";

const createShortUrl = (url) => {
  return api.post("/shorten", {
    originalUrl: url,
  });
};

export { createShortUrl };
