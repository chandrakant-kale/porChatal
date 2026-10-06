const pool = require("../db");

const chatHome = async (req, res) => {
    try {

        const id = req.chat;


        const result = await pool.query(`
        SELECT username 
        FROM users
        WHERE id = $1;`, [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // console.log("User found");
        
        return res.status(200).json({
            success: true,
            user: result.rows[0]
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