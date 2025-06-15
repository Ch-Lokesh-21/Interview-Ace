const Session = require("../models/Session");
const Question = require("../models/Question");

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id;
    const session = new Session({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const questionDoc = await Question.create({
          question: q.question,
          answer: q.answer,
          session: session._id,
        });
        return questionDoc._id;
      })
    );
    session.questions = questionDocs;
    await session.save();
    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId)
    .populate({
      path: "questions",
      options: { sort: { isPinned: -1, createdAt: 1 } },
    }).exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await Session.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    // Check if the user is authorized to delete this session
    if (session.user.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete this session" });
    }

    // Optionally, delete associated questions
    await Question.deleteMany({ session: sessionId });
    
    // Delete the session
    await session.deleteOne();
    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
