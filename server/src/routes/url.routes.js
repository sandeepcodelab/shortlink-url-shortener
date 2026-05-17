import { Router } from "express";
import {
  createShortUrl,
  getDashboardInfo,
  getUserAllLinks,
} from "../controllers/url.controllers.js";
import { authMiddleware, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/shorten").post(authMiddleware, createShortUrl);

router.route("/getAllLinks/").get(verifyJWT, getUserAllLinks);
router.route("/dashboard-info/").get(verifyJWT, getDashboardInfo);

export default router;
