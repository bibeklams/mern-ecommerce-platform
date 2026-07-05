import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

// Error middleware (always last)
app.use(errorMiddleware);

export default app;
