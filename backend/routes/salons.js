import express from "express";
import pool from "../db.js"; // must match db.js path

const router = express.Router();

router.get("/salons", async (req, res) => {
  try {
    const gender = req.query.gender || "man";
    const result = await pool.query(
      "SELECT id, name, gender, image_url, city FROM salons WHERE gender = $1",
      [gender]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
