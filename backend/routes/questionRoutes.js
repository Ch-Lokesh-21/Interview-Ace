const express= require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { togglePinQuestion, updateQuestionNote, addQuestionsToSessions} = require("../controllers/questionController");

router.post("/add", protect, addQuestionsToSessions);
router.post("/:id/pin", protect, togglePinQuestion);
router.post("/:id/note", protect, updateQuestionNote);


module.exports= router;