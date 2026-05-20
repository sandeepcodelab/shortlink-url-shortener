import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { cookieOptions } from "../utils/constant.js";

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

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    // User auth
    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "Invalid token. Please login again.");
      }

      req.user = user;

      return next();
    }

    // Guset auth
    let guest = req.cookies?.guest;

    if (!guest) {
      guest = nanoid(20);

      res.cookie("guest", guest, cookieOptions);
    }

    req.guest = guest;

    next();
  } catch (err) {
    next(new ApiError(401, err?.message || "Authentication failed"));
  }
};

export { verifyJWT, authMiddleware };
