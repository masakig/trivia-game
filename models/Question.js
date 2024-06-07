const mongoose = require('mongoose');

// Define a schema for trivia questions
const questionSchema = new mongoose.Schema({
  question: String,
  type: String,
  answers: [{ text: String, correct: Boolean }],
  points: Number
});

// Create a model for trivia questions
const Question = mongoose.model('Question', questionSchema);

// Function to add a new question
const addQuestion = async (questionData) => {
  try {
    const newQuestion = new Question(questionData);
    await newQuestion.save();
    console.log('Question added successfully:', newQuestion);
  } catch (error) {
    console.error('Error adding question:', error);
  }
};

module.exports = { Question, addQuestion };
