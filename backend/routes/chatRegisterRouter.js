const express = require("express");

const chatRegister = require("../controllers/chatRegisterController");

const router = express.Router();

router.post("/", chatRegister);

module.exports = router;