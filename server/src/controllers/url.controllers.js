import { Url } from "../models/url.models.js";
import { nanoid } from "nanoid";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createShortUrl = AsyncHandler(async (req, res) => {
  const { originalUrl = "" } = req.body;
  // let guest = req.cookies?.guest || nanoid(20);
  const guest = req.guest;

  if (!originalUrl) {
    throw new ApiError(400, "URL is required", []);
  }

  // check limits
  if (guest) {
    const guestUrlCount = await Url.countDocuments({
      "createdBy.guest": guest,
    });

    if (guestUrlCount >= 3) {
      throw new ApiError(429, "Guest limit reached. Please login to continue.");
    }
  }

  let shortCode;

  while (true) {
    shortCode = nanoid(7);

    const exists = await Url.findOne({ shortCode });
    if (!exists) break;
  }

  const newUrl = await Url.create({
    shortCode,
    originalUrl,
    createdBy: {
      guest,
    },
  });

  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  // const option = {
  //   HttpOnly: true,
  //   Secure: process.env.NODE_ENV === "production",
  //   SameSite: "Lax",
  // };

  return (
    res
      .status(201)
      // .cookie("guest", guest, option)
      .json(
        new ApiResponse(201, { url: shortUrl }, "Url created successfully.")
      )
  );
});

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
