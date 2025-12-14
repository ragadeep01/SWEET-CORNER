import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import contractRoutes from "./routes/orderRoutes.js";
import contractFarmRoutes from "./routes/contractfarmRoutes.js";

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

// ---------------- ROUTES ----------------
app.use("/api", userRoutes);
app.use("/api/v1/contractfarm", contractFarmRoutes);
app.use("/api/v1/contract", contractRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
