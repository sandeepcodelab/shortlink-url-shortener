import { Url } from "../models/url.models.js";

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl = "" } = req.body;

    if (!originalUrl) {
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });
    }

    const shortCode = Math.random().toString(36).substring(2, 8);

    const newUrl = await Url.create({
      shortCode,
      originalUrl,
    });

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    return res.status(201).json({
      success: true,
      message: "Url created successfully.",
      url: shortUrl,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const { shortCode = "" } = req.params;

    if (!shortCode) {
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });
    }

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    url.clicks += 1;
    await url.save({ validateBeforeSave: false });

    return res.redirect(url.originalUrl);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createShortUrl, getOriginalUrl };
