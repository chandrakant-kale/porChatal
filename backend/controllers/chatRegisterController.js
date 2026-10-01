const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const chatRegister = async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name and Password must required"
            });
        }

        const newName = name.trim();
        const newPassword = password.trim();

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at lest 8 characters"
            })
        }

        const result = await pool.query(`
            INSERT INTO users(name, password)
            VALUES ($1, $2)
            RETURNING id, name`,
            [newName, newPassword]
        );

        console.log(result.rows[0]);

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
                message: "Company with this email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "database error"
        })
    }
}

module.exports = chatRegister;