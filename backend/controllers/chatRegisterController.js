
const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const chatRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    const newUsername = username.trim();

    if (newUsername.length < 3 || newUsername.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 3 and 30 characters"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        success: false,
        message: "Password is too long"
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users(username, password_hash)
       VALUES ($1, $2)
       RETURNING id, username`,
      [newUsername, hashedPassword]
    );

    const userID = result.rows[0].id;

    const token = jwt.sign(
      { userId: userID },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
        algorithm: "HS256"
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("porChatal", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 12 * 60 * 60 * 1000,
      path: "/"
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Username already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = chatRegister;
