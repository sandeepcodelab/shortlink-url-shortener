import { Router } from "express";
import { createShortUrl } from "../controllers/url.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/shorten").post(authMiddleware, createShortUrl);

export default router;
