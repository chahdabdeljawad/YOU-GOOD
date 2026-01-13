import express from "express";
import pool from "../db.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Apply admin verification to all routes
router.use(verifyAdmin);

// Get all salons (admin view)
router.get("/salons", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM salons 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get salon by ID
router.get("/salons/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

// Create new salon
router.post("/salons", async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    city,
    image_url,
    phone,
    address,
    description,
  } = req.body;

  try {
    // Hash password
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.default.hash(
      password || "salon123",
      10
    );

    const result = await pool.query(
      `INSERT INTO salons 
       (name, email, password, gender, city, image_url, phone, address, description, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) 
       RETURNING *`,
      [
        name,
        email,
        hashedPassword,
        gender || "man",
        city,
        image_url ||
          "https://images.unsplash.com/photo-1560066984-138dadb4c035",
        phone || "",
        address || "",
        description || "",
      ]
    );

    res.status(201).json({
      message: "Salon created successfully",
      salon: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update salon
router.put("/salons/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Build dynamic update query
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== "id") {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);

    const query = `
      UPDATE salons 
      SET ${fields.join(", ")} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Salon not found" });
    }

    res.json({
      message: "Salon updated successfully",
      salon: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete salon
router.delete("/salons/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM salons WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Salon not found" });
    }

    res.json({
      message: "Salon deleted successfully",
      salon: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all reservations
router.get("/reservations", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, 
             s.name as salon_name,
             u.name as user_name,
             u.email as user_email
      FROM reservations r
      LEFT JOIN salons s ON r.salon_id = s.id
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update reservation status
router.put("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE reservations 
       SET status = $1 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({
      message: "Reservation updated",
      reservation: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete reservation
router.delete("/reservations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM reservations WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({
      message: "Reservation deleted",
      reservation: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
