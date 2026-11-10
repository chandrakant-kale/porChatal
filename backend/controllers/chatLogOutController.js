
const logOut = (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("porChatal", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error("Logout error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = logOut;
