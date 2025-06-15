const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require("../controllers/sessionController");

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySessions);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

module.exports = router;