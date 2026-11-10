const {
  generateCsrfToken
} = require("../middlewares/csrfMiddleware");

const getCsrfToken = (req, res) => {
  try {
    const authToken = req.cookies?.porChatal;

    if (!authToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const csrfToken = generateCsrfToken(authToken);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("csrfToken", csrfToken, {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 12 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      csrfToken
    });

  } catch (error) {
    console.error("CSRF token generation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not generate CSRF token"
    });
  }
};

module.exports = getCsrfToken;