const express = require("express");

const deleteAccount = require("../controllers/deleteAccountController");
const cookieAuth = require("../middlewares/chatCookieAuthMiddleware");

const router = express.Router();

router.post("/", cookieAuth, deleteAccount);

module.exports = router;