import { Url } from "../models/url.models.js";
import { nanoid } from "nanoid";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  let { search = "", limit = 10, page = 1 } = req.query;

  if (!user) throw new ApiError(400, "User id is required");

  search = String(search);
  limit = Number(limit);
  page = Number(page);

  const skip = (page - 1) * limit;

  // Query
  const filter = { "createdBy.user": user._id };

  if (search) {
    filter.$or = [
      {
        shortCode: { $regex: search, $options: "i" },
      },
      {
        originalUrl: { $regex: search, $options: "i" },
      },
    ];
  }

  const userUrls = await Url.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!userUrls) throw new ApiError(404, "Link not found");

  const totalRecords = await Url.find(filter).countDocuments();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        links: userUrls,
        info: {
          totalRecords,
          currentPage: page,
          limit,
          skip,
          totalPages: Math.ceil(totalRecords / limit),
        },
      },
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

const deleteLink = AsyncHandler(async (req, res) => {
  const { recordId = "" } = req.params;

  if (!recordId) throw new ApiError(400, "Rocord Id is missing");

  const deleteRecord = await Url.findByIdAndDelete(recordId);

  if (!deleteRecord) throw new ApiError(404, "Record not found");

  const allLinks = await Url.find().sort({ createdAt: -1 }).limit(10);
  const totalRecords = await Url.find().countDocuments();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { links: allLinks, totalRecords },
        "Record deleted successfully"
      )
    );
});

export {
  createShortUrl,
  getOriginalUrl,
  getUserAllLinks,
  getDashboardInfo,
  deleteLink,
};
