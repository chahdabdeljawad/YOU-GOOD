import express from "express";
import pool from "../db.js"; // your postgres pool

const router = express.Router();

// POST /api/reservations
router.post("/", async (req, res) => {
  const { salon_id, user_id, category, date, time } = req.body;

  if (!salon_id || !user_id || !category || !date || !time) {
    return res.status(400).json({ error: "Missing reservation data" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO reservations (salon_id, user_id, category, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [salon_id, user_id, category, date, time]
    );

    res
      .status(201)
      .json({ message: "Reservation confirmed", reservation: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
