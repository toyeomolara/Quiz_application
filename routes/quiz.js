const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Add your CRUD operations and quiz logic here

// Create a QuizAttempt model
const QuizAttempt = mongoose.model('QuizAttempt', {
    userId: String,
    questionId: String,
    userAnswer: Number,
    isCorrect: Boolean,
    timestamp: { type: Date, default: Date.now },
  });
  

module.exports = router;