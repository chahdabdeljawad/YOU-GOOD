import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET ALL SALONS (existing)
router.get("/", async (req, res) => {
  const gender = req.query.gender || "man";
  try {
    const result = await pool.query("SELECT * FROM salons WHERE gender = $1", [
      gender,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id); // convert string to integer
  if (isNaN(id)) return res.status(400).json({ error: "Invalid salon ID" });

  try {
    const result = await pool.query("SELECT * FROM salons WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Salon not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
