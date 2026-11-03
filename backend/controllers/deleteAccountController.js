
const pool = require("../db");

const deleteAccount = async (req, res) => {
  try {
    const id = req.chat;

    const deletedResult = await pool.query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING username`,
      [id]
    );

    if (deletedResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletedResult.rows[0],
    });

  } catch (error) {
    console.error("Delete account error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = deleteAccount;
