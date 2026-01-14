import express from "express";
import pool from "../db.js";

const router = express.Router();

/*
  GET /api/salons
  Supports:
  - ?gender=man|woman
  - ?search=text
*/
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
    console.error("Salon fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
  GET /api/salons/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM salons WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Salon not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Salon fetch by ID error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
  POST /api/salons
*/
router.post("/", async (req, res) => {
  const { name, city, gender, description, image_url } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO salons (name, city, gender, description, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, city, gender, description, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Salon create error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
