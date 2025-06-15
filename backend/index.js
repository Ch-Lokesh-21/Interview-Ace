require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the API");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

connectDB()
  .then(() => {
    app.listen(port, () => {
      // console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
