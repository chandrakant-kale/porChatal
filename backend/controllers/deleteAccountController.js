const pool = require("../db");

const deleteAccount = async (req, res) => {
    try {
        const id = req.chat;

        const result = await pool.query(`
            SELECT username
             FROM users
             where id = $1
            `, [id])

        if (result.rowCount === 0) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const userName = result.rows[0];

        const deletedResult = await pool.query(`
            DELETE from user 
            WHERE username = $1
            RETURNING username`, [userName]
        )

        if (deletedResult.rowCount === 0) {
            return res.status(400).json({
                success: false,
                message: "Unable to delete user"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user deleted successfully",
            user: deletedResult.rows[0]
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = deleteAccount;