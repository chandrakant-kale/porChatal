const jwt = require("jsonwebtoken");

const cookieAuth = async (req, res, next) => {
    try {
        const token = req.cookies.porChatal;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "authentication required"
            })
        }

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        console.log("verified", verified);

        req.chat = jwt.verified.userId;

        next();

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "invalid or expire session"
        })
    }
}

module.exports = cookieAuth;