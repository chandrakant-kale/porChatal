const express = require("express");

const chatCookieAuth = require("../middlewares/chatCookieAuthMiddleware");
const chatHomeAuth = require("../controllers/chatHomeAuthController");

const router = express.Router();

router.get("/", chatCookieAuth, chatHomeAuth);

module.exports = router;