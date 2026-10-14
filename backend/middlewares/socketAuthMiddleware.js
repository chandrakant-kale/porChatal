
const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie || "";

    const token = cookieHeader
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith("porChatal="))
      ?.slice("porChatal=".length);

    console.log("Socket cookie present:", Boolean(token));

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const verified = jwt.verify(
      decodeURIComponent(token),
      process.env.JWT_SECRET
    );

    socket.userId = verified.userId;

    console.log("Socket authenticated:", socket.userId);

    return next();
  } catch (error) {
    console.error(
      "Socket authentication error:",
      error.name,
      error.message
    );

    return next(new Error("Expired or invalid session"));
  }
};

module.exports = socketAuth;