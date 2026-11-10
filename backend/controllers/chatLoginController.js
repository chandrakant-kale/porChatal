
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const chatLogin = async (req, res) => {
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

    if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const newUsername = username.trim();

    const checkResult = await pool.query(
      `SELECT id, username, password_hash
       FROM users
       WHERE username = $1`,
      [newUsername]
    );

    if (checkResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const user = checkResult.rows[0];

    const checkPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      { userId: user.id },
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

    return res.status(200).json({
      success: true,
      message: "Login successfully"
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = chatLogin;
