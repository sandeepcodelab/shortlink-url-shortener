import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse";
import { AsyncHandler } from "../utils/AsyncHandler.js";

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

  if (!fullname) throw new ApiError(400, "Fullname is required", []);
  if (!email) throw new ApiError(400, "Email is required", []);
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

  // Set user for currect request
  req.user = user;

  // Get tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);

  // Cookie options
  const options = {
    HttpOnly: true,
    Secure: process.env.NODE_ENV === "production",
    SameSite: "Lax",
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, { user }, "User registered successfully"));
});

const login = AsyncHandler(async (req, res) => {
  const { email = "", password = "" } = req.body;

  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "Invalid email or password");

  const isPasswordCorrect = await user.isPasswordCorrect(user.password);

  if (!isPasswordCorrect)
    throw new ApiError(400, "Please check your email and password");

  const loggedinUser = await User.findById().select("-password -refreshToken");

  if (!loggedinUser)
    throw new ApiError(
      500,
      "User login failed, Something went wrong during login"
    );

  // Set user for currect request
  req.user = loggedinUser;

  // Get tokens
  const { accessToken, refreshToken } = await generateTokens(loggedinUser._id);

  // Cookie options
  const options = {
    HttpOnly: true,
    Secure: process.env.NODE_ENV === "production",
    SameSite: "Lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "Logged in successfully"));
});
