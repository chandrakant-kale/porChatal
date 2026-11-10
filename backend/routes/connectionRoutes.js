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

const { csrfProtection } = require("../middlewares/csrfMiddleware");

router.post("/code", homeAuthMiddlweare, csrfProtection, createCodeLimiter, createConnectionCode);

router.post("/join", homeAuthMiddlweare, csrfProtection, joinCodeLimiter, joinConnection);

router.get("/", homeAuthMiddlweare, getConnections);

router.delete("/:userId", homeAuthMiddlweare, csrfProtection, deleteConnection);

module.exports = router;