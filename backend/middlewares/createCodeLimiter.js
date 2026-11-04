const rateLimit = require("express-rate-limit");

const createCodeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many connection codes generated. Try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = createCodeLimiter;