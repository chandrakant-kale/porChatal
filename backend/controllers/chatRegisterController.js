const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const chatRegister = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username?.trim() || !password) {
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
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(`
            INSERT INTO users(username, password_hash)
            VALUES ($1, $2)
            RETURNING id, username`,
            [newUsername, hashedPassword]
        );

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const userID = result.rows[0].id;

        const token = jwt.sign(
            { userId: userID },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        )

        res.cookie("porChatal", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 12 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Database error"
        })
    }
}

module.exports = chatRegister;