const Question = require("../models/Question");
const Session = require("../models/Session");

exports.togglePinQuestion = async (req, res) => {
    try{
        const {id} = req.params;
        const question = await Question.findById(id);
        if(!question)
        {
            return res.status(404).json({message:"Question not found"});
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({
            success:true,
            question
        });
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
};

exports.updateQuestionNote = async (req, res) => {
    try{
        const {id} = req.params;
        const {note} = req.body;
        const question = await Question.findById(id);
        if(!question)
        {
            return res.status(404).json({ success:false, message:"Question not found"});
        }

        question.note = note || "";
        await question.save();
        res.status(200).json({
            success:true,
            question
        });
    }
    catch(err)
    {
        res.status(500).json({"message":err.message});
    }
};

exports.addQuestionsToSessions = async (req, res) => {
    try
    {
        const {sessionId,questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions))
        {
            return res.status(400).json({
                message:"Invalid Inputs"
            });
        }

        const session = await Session.findById(sessionId);
        if(!session)
        {
            return res.status(400).json({message:"Session not found"});
        }

        const createdQuestions = await Question.insertMany(
            questions.map((q)=>({
                session:sessionId,
                question:q.question,
                answer: q.answer
            }))
        );
        
        session.questions.push(...createdQuestions.map((q)=>q._id));
        await session.save();
        res.status(200).json(createdQuestions);
    }
    catch(err)
    {
        res.status(500).json({"message":err});
    }
};