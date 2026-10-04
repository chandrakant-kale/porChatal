const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const chatRegister = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name and Password must required"
            });
        }

        const newUserName = username.trim();
        const newPassword = password.trim();

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at lest 8 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await pool.query(`
            INSERT INTO users(username, password_hash)
            VALUES ($1, $2)
            RETURNING id, username`,
            [newUserName, hashedPassword]
        );

        const ID = result.rows[0].id;

        const token = jwt.sign(
            { userId: ID },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        )

        res.cookie("porChatal", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 12 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User Register Successfully"
        })

    } catch (error) {
        console.log(error);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "User with this Name already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Database error"
        })
    }
}

module.exports = chatRegister;