import express from "express";
import { getOriginalUrl } from "./controllers/url.controllers.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globleErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Basic config
app.use(express.json());
app.use(cookieParser());

// Cors config
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// import routes
import urlRouter from "./routes/url.routes.js";
app.use("/api", urlRouter);
app.get("/:shortCode", getOriginalUrl);

import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);

// Gloable error handler
app.use(globleErrorHandler);

export default app;
