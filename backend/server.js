import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import salonsRouter from "./routes/salons.js";
import authRoutes from "./routes/auth.js";
import reservationsRouter from "./routes/reservations.js";

dotenv.config();

const app = express();

// Fix CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/salons", salonsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationsRouter);

// Home route
app.get("/", (req, res) => {
  res.send("✅ YOU GOOD Backend is running");
});

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Test route for salons
app.get("/test-salons", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM salons LIMIT 5");
    res.json({ count: result.rows.length, salons: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
