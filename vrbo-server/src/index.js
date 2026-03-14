import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB, closeDB } from "./config/db.js";
import EarningsRoutes from "./routes/EarningsRouts.js";
import HotelRoutes from "./routes/HotelRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

// ─── Validate Environment Variables ───────────────────────────────────────────
if (!process.env.DB_USER || !process.env.DB_PASS) {
  console.error("❌ Missing DB_USER or DB_PASS in .env");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.send("🚀 VRBO Server is running..."));
app.use("/", EarningsRoutes);
app.use("/", HotelRoutes);
app.use("/", UserRoutes);

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
process.on("SIGINT", async () => {
  await closeDB();
  process.exit();
});