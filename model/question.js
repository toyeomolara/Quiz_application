import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    question: String,
    answers: [],
    correctAnswer: String
});

const Question = mongoose.model('Question', questionSchema);

export default Question;

