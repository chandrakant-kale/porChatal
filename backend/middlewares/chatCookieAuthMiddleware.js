const jwt = require("jsonwebtoken");

const cookieAuth = (req, res, next) => {
    try {
        const token = req.cookies?.porChatal;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not configured");

            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        );

        if (
            !verified ||
            typeof verified !== "object" ||
            typeof verified.userId !== "string"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid session"
            });
        }

        req.chat = verified.userId;

        return next();

    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired session"
            });
        }

        console.error("Authentication middleware error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = cookieAuth;