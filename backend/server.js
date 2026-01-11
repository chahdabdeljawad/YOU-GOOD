import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import salonRoutes from "./routes/salons.js";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";
import reservationsRouter from "./routes/reservations.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", salonRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoutes);

app.use("/api/reservations", reservationsRouter);

// TEST DATABASE CONNECTION
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
