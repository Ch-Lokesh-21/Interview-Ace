const { GoogleGenAI } = require("@google/genai");
const {
  questionAnswerPrompt,
  conceptExplanationPrompt,
} = require("../utils/prompts");
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const prompt = conceptExplanationPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
