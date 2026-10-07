const express = require("express");

const {
    createConnectionCode,
    joinConnection,
    getConnections,
    deleteConnection
} = require("../controllers/connectionController");

const homeAuthMiddlweare = require("../middlewares/chatCookieAuthMiddleware");

const router = express.Router();


router.post("/code", homeAuthMiddlweare, createConnectionCode);

router.post("/join", homeAuthMiddlweare, joinConnection);

router.get("/", homeAuthMiddlweare, getConnections);

router.delete("/:connectionId", homeAuthMiddlweare, deleteConnection);

module.exports = router;