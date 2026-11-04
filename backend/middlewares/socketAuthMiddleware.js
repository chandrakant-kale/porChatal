const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const socketAuth = (socket, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return next(new Error("Internal server error"));
    }

    const cookieHeader = socket.handshake.headers.cookie || "";

    const cookies = cookie.parse(cookieHeader);
    const token = cookies.porChatal;

    if (!token) {
      return next(new Error("Authentication required"));
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
      return next(new Error("Invalid session"));
    }

    socket.userId = verified.userId;

    return next();

  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return next(new Error("Expired or invalid session"));
    }

    console.error("Socket authentication error:", error.message);

    return next(new Error("Authentication failed"));
  }
};

module.exports = socketAuth;