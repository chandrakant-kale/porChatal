const pool = require("../db");

const logOut = async (req, res) => {
    try {
        res.clearCookie("porChatal", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
        })

        res.status(200).json({
            success: true,
            message: "Loged out successfull"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
module.exports = logOut;