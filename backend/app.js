import express from "express";
import dotenv from "dotenv";
dotenv.config();

import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// Error middleware (always last)
app.use(errorMiddleware);

export default app;
