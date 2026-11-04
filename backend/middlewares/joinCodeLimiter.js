const rateLimit = require("express-rate-limit");

const joinCodeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many connection attempts. Try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = joinCodeLimiter;