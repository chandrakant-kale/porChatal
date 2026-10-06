const pool = require("../db");

const chatHome = async (req, res) => {
    try {
        const id = req.chat;

        const result = await pool.query(`
        SELECT username 
        FROM users
        WHERE id = $1;`, [id]
        );
        console.log(result);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User found"
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
module.exports = chatHome;