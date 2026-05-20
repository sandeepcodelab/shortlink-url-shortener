import { User } from "../models/user.models.js";
import { mergeGuestLinks } from "../services/mergeGuestLinks.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/constant.js";

const generateTokens = async (userID) => {
  try {
    const user = await User.findById(userID);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Tokens generation failed");
  }
};

const register = AsyncHandler(async (req, res) => {
  const { fullname = "", email = "", password = "" } = req.body;
  const guest = req?.cookies?.guest;

  if (!fullname) throw new ApiError(400, "Fullname is required", []);
  if (!email) throw new ApiError(400, "Email is required", []);
  if (!password) throw new ApiError(400, "Password is required", []);
  if (!password) throw new ApiError(400, "Password is required", []);

  const isUserExists = await User.findOne({ email });

  if (isUserExists) throw new ApiError(409, "Email already registered", []);

  const createUser = await User.create({
    fullname,
    email,
    password,
  });

  const user = await User.findById(createUser._id).select(
    "-password -refreshToken"
  );

  if (!user) throw new ApiError(500, "User registration failed", []);

  // Guest Links merging
  const mergeResult = await mergeGuestLinks(guest, user._id);

  // Get tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { user, merged: mergeResult?.modifiedCount || 0 },
        "User registered successfully"
      )
    );
});

const login = AsyncHandler(async (req, res) => {
  const { email = "", password = "" } = req.body;
  const guest = req?.cookies?.guest;

  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "Invalid email or password");

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect)
    throw new ApiError(400, "Please check your email and password");

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!loggedinUser)
    throw new ApiError(
      500,
      "User login failed, Something went wrong during login"
    );

  // Guest Links merging
  const mergeResult = await mergeGuestLinks(guest, loggedinUser._id);

  // Get tokens
  const { accessToken, refreshToken } = await generateTokens(loggedinUser._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedinUser, merged: mergeResult?.modifiedCount || 0 },
        "Logged in successfully"
      )
    );
});

const currentUser = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req.user }, "User fetched successfully")
    );
});

const logout = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { returnDocument: "after" }
  );

  return res
    .status(200)
    .clearCookie("accessToken", "", cookieOptions)
    .clearCookie("refreshToken", "", cookieOptions)
    .json(new ApiResponse(200, {}, "Logout successfully"));
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;

  if (!oldRefreshToken) throw new ApiError(401, "Unauthorized request");

  try {
    const decodedToken = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (oldRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Refresh token is expired or used");

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { register, login, currentUser, logout, refreshAccessToken };
