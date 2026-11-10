const express = require("express");
const router = express.Router();

const cookieAuth = require("../middlewares/chatCookieAuthMiddleware");
const getCsrfToken = require("../controllers/csrfController");

router.get("/", cookieAuth, getCsrfToken);

module.exports = router;