const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const { getMessage, sendMessage } = require("../controllers/messageController");

const router = express.Router();

router.post("/send/:id", isAuthenticated, sendMessage);
router.get("/all/:id", isAuthenticated, getMessage);
module.exports = router;
