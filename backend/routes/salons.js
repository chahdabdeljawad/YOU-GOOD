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

// Add this endpoint to your existing file

// SEARCH SALONS
router.get("/search", async (req, res) => {
  const query = req.query.q || "";

  if (!query.trim()) {
    return res.json([]);
  }

  try {
    const result = await pool.query(
      `SELECT * FROM salons 
       WHERE name ILIKE $1 
       OR city ILIKE $1 
       OR description ILIKE $1 
       OR gender ILIKE $1 
       ORDER BY rating DESC 
       LIMIT 10`,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

// ALSO update the existing GET / endpoint to support search:
router.get("/", async (req, res) => {
  const gender = req.query.gender || "man";
  const search = req.query.search || "";

  try {
    let query = "SELECT * FROM salons WHERE gender = $1";
    let params = [gender];

    if (search) {
      query += " AND (name ILIKE $2 OR city ILIKE $2 OR description ILIKE $2)";
      params.push(`%${search}%`);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
