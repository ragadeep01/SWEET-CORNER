import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import contractRoutes from "./routes/orderRoutes.js";
import contractFarmRoutes from "./routes/sweetRoutes.js";

dotenv.config();

const app = express(); // ✅ app FIRST

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", userRoutes);
app.use("/api", contractFarmRoutes);
app.use("/api", contractRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
  });
});

export default app;
