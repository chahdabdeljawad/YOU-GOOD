import express from "express";
import cors from "cors";
import salonsRouter from "./routes/salons.js";
import authRoutes from "./routes/auth.js";
import reservationsRouter from "./routes/reservations.js";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// Salons API
app.use("/api/salons", salonsRouter);

// Auth API
app.use("/api/auth", authRoutes);

// Reservations API
app.use("/api/reservations", reservationsRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// TEST DATABASE CONNECTION
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

const PORT = 5002;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
