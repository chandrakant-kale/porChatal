const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const chatLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and Password is required"
            })
        }

        const newUsername = username.trim();

        const checkResult = await pool.query(`
            SELECT id, username, password_hash
            FROM users
            WHERE username = $1 ;`,
            [newUsername]
        );

        if (checkResult.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const user = checkResult.rows[0];

        const existPassword = user.password_hash;

        const checkPassword = await bcrypt.compare(password, existPassword);

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const userID = user.id;

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

        return res.status(200).json({
            success: true,
            message: "Login successfully"
        })


    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

module.exports = chatLogin;