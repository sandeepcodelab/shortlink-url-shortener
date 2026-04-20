import express from "express";
import urlRouter from "./routes/url.routes.js";
import { getOriginalUrl } from "./controllers/url.controllers.js";

const app = express();

// Basic config
app.use(express.json());

// Route config
app.use("/api", urlRouter);
app.get("/:shortCode", getOriginalUrl);

export default app;
