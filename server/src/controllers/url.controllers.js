import { Url } from "../models/url.models.js";
import { nanoid } from "nanoid";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createShortUrl = AsyncHandler(async (req, res) => {
  const { originalUrl = "" } = req.body;

  const user = req.user;
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
      user: user?._id || null,
      guest: guest || null,
    },
  });

  // const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
  const shortUrl = `${req.protocol}://${req.host}/${shortCode}`;

  return res
    .status(201)
    .json(new ApiResponse(201, { url: shortUrl }, "Url created successfully."));
});

const getOriginalUrl = AsyncHandler(async (req, res) => {
  const { shortCode = "" } = req.params;

  if (!shortCode) throw new ApiError(400, "URL is required");

  const url = await Url.findOne({ shortCode });

  if (!url) throw new ApiError(404, "URL not found");

  url.clicks += 1;
  url.visits.push({ ipAddress: req.ip });

  await url.save({ validateBeforeSave: false });

  return res.redirect(url.originalUrl);
});

const getUserAllLinks = AsyncHandler(async (req, res) => {
  const user = req.user;
  let { topLinks = false, limit = 10, page = 1, sort = "desc" } = req.query;

  if (!user) throw new ApiError(400, "User id is required");

  limit = Number(limit);
  page = Number(page);

  const skip = (page - 1) * limit;

  // Query
  const query = Url.find({ "createdBy.user": user._id });

  if (topLinks) {
    query.sort({
      clicks: -1,
    });
  }
  if (sort) {
    query.sort({
      createdAt: sort === "desc" ? -1 : 1,
    });
  }

  query.skip(skip);
  query.limit(limit);

  const DocCount = await Url.find({
    "createdBy.user": user._id,
  }).countDocuments();

  const userUrls = await query;

  if (!userUrls) throw new ApiError(404, "Link not found");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { links: userUrls, info: { total: DocCount, page, limit, skip } },
        "Links fetched successfully"
      )
    );
});

const getDashboardInfo = AsyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) throw new ApiError(400, "User id is required");

  const totalLink = await Url.find({
    "createdBy.user": user._id,
  }).countDocuments();

  const totalClicks = await Url.aggregate([
    {
      $match: {
        "createdBy.user": user._id,
      },
    },
    {
      $group: {
        _id: null,
        clicks: {
          $sum: "$clicks",
        },
      },
    },
  ]);

  if (!totalClicks) throw new ApiError(500, "Failed to fetch dashboard data");

  const links = await Url.find({
    "createdBy.user": user._id,
  })
    .sort({ clicks: -1 })
    .limit(10);

  if (!links) throw new ApiError(500, "Failed to fetch dashboard data");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        links,
        totalLink: totalLink || 0,
        totalClicks: totalClicks[0]?.clicks || 0,
      },
      "Data fetched successfully"
    )
  );
});

export { createShortUrl, getOriginalUrl, getUserAllLinks, getDashboardInfo };
