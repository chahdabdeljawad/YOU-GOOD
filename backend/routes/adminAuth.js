import express from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    // Check in admins table
    const adminRes = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);

    const admin = adminRes.rows[0];

    if (!admin) {
      return res.status(401).json({ error: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" }
    );

    // Remove password from response
    const { password: _, ...adminWithoutPassword } = admin;

    res.json({
      message: "Admin login successful",
      admin: adminWithoutPassword,
      token,
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Register (for first time setup)
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    // Check if admin exists
    const existingAdmin = await pool.query(
      "SELECT * FROM admins WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingAdmin.rows.length > 0) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin
    const result = await pool.query(
      `INSERT INTO admins (username, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, username, email, created_at`,
      [username, email, hashedPassword]
    );

    const admin = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      admin,
      token,
    });
  } catch (err) {
    console.error("Admin register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
