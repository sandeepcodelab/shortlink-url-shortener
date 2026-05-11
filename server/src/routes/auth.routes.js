import { Router } from "express";
import {
  currentUser,
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/current-user").get(verifyJWT, currentUser);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
