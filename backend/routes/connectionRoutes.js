const express = require("express");

const {
    createConnectionCode,
    joinConnection,
    getConnections,
    deleteConnection
} = require("../controllers/connectionController");

const createCodeLimiter = require("../middlewares/createCodeLimiter");
const joinCodeLimiter = require("../middlewares/joinCodeLimiter");
const homeAuthMiddlweare = require("../middlewares/chatCookieAuthMiddleware");

const router = express.Router();


router.post("/code", homeAuthMiddlweare, createCodeLimiter, createConnectionCode);

router.post("/join", homeAuthMiddlweare, joinCodeLimiter, joinConnection);

router.get("/", homeAuthMiddlweare, getConnections);

router.delete("/:userId", homeAuthMiddlweare, deleteConnection);

module.exports = router;