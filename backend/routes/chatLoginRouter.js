const express = require("express");

const chatLogin = require("../controllers/chatLoginController");

const router = express.Router();

router.post("/",chatLogin);

module.exports = router;