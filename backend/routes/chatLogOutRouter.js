const express = require("express");

const logOutController = require("../controllers/chatLogOutController");

const router = express.Router();

router.post("/", logOutController);

module.exports = router;