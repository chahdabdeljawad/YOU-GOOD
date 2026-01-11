import express from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER (for regular users)
router.post("/register", async (req, res) => {
  const { name, email, password, gender, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table
    const userResult = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, email, hashedPassword, role]
    );

    const userId = userResult.rows[0].id;

    // If user is a salon, insert into salons table too
    if (role === "SALON") {
      await pool.query(
        "INSERT INTO salons (name, gender, email, password, created_at) VALUES ($1, $2, $3, $4, NOW())",
        [name, gender, email, hashedPassword]
      );
    }

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// REGISTER SALON (new endpoint)
router.post("/register-salon", async (req, res) => {
  const { name, email, password, gender, city, image_url, phone, address } =
    req.body;

  if (!name || !email || !password || !gender || !city) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if salon already exists
    const existingSalon = await pool.query(
      "SELECT * FROM salons WHERE email = $1 OR name = $2",
      [email, name]
    );

    if (existingSalon.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Salon with this email or name already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into salons table
    const salonResult = await pool.query(
      "INSERT INTO salons (name, gender, email, password, image_url, city, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *",
      [
        name,
        gender,
        email,
        hashedPassword,
        image_url ||
          "https://images.unsplash.com/photo-1560066984-138dadb4c035",
        city || "Unknown",
      ]
    );

    const salon = salonResult.rows[0];

    // Also create a user entry for this salon
    const userResult = await pool.query(
      "INSERT INTO users (name, email, password, gender, role, photo, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id, name, email, role, photo",
      [
        name,
        email,
        hashedPassword,
        gender,
        "SALON",
        image_url || "https://i.pravatar.cc/150",
      ]
    );

    const user = userResult.rows[0];
    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Salon registered successfully",
      user: userWithoutPassword,
      salon: salon,
      token,
    });
  } catch (err) {
    console.error("Salon registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = userRes.rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    // remove password from object
    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
