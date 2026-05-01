import express from "express";
import urlRouter from "./routes/url.routes.js";
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
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Route config
app.use("/api", urlRouter);
app.get("/:shortCode", getOriginalUrl);

// Gloable error handler
app.use(globleErrorHandler);

export default app;
