import express from "express";
import pool from "../db.js";

const router = express.Router();

/*
  GET /api/salons
  Supports:
  - ?gender=man|woman (optional)
  - ?search=text
*/
router.get("/", async (req, res) => {
  const gender = req.query.gender;
  const search = req.query.search || "";

  try {
    let query = "SELECT * FROM salons WHERE 1=1";
    let params = [];
    let paramCount = 0;

    // Add gender filter ONLY if there's NO search term
    // When searching, show results from all genders
    if (gender && !search.trim()) {
      paramCount++;
      query += ` AND gender = $${paramCount}`;
      params.push(gender);
    }

    // Add search filter if provided
    if (search.trim()) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR city ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
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
  GET /api/salons/search
  Search across all salons (no gender filter)
*/
router.get("/search", async (req, res) => {
  const search = req.query.q || "";
  const limit = parseInt(req.query.limit) || 20;

  try {
    let query = "SELECT * FROM salons";
    let params = [];

    if (search.trim()) {
      query += ` WHERE (name ILIKE $1 OR city ILIKE $1 OR description ILIKE $1)`;
      params.push(`%${search}%`);
    }

    query += ` LIMIT $${params.length + 1}`;
    params.push(limit);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Search error:", err);
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

// In salons.js - Add this route
router.get("/search/instant", async (req, res) => {
  const search = req.query.q || "";
  const limit = parseInt(req.query.limit) || 5;

  if (search.trim().length < 2) {
    return res.json([]);
  }

  try {
    // In GET /api/salons/search/instant route:
    const result = await pool.query(
      `SELECT DISTINCT s.* 
   FROM salons s
   LEFT JOIN services sv ON s.id = sv.salon_id
   WHERE (s.name ILIKE $1 
          OR s.city ILIKE $1 
          OR s.description ILIKE $1
          OR sv.service_name ILIKE $1
          OR sv.description ILIKE $1)
   LIMIT $2`,
      [`%${search}%`, limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Instant search error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
