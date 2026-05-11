import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const authMiddleware = async (req, res, next) => {
  let guest = req.cookies?.guest;

  const options = {
    HttpOnly: true,
    Secure: process.env.NODE_ENV === "production",
    SameSite: "Lax",
  };

  if (!guest) {
    guest = nanoid(20);
    res.cookie("guest", guest, options);
  }

  req.guest = guest;

  next();
};

const verifyJWT = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized access. Please login to continue.");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user)
      throw new ApiError(401, "Invalid token. Please login again to continue.");

    req.user = user;

    next();
  } catch (err) {
    throw new ApiError(
      401,
      err?.message || "Invalid token. Please login again to continue."
    );
  }
};

export { authMiddleware, verifyJWT };
