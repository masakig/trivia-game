const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { Question, addQuestion } = require('./models/Question');

const app = express();

// Change the route to return a random question
app.get('/questions/random', async (req, res) => {
  try {
    const questions = await Question.find();
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.json(randomQuestion);
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/trivia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Add a trivia question
const newQuestionData = {
  question: "What is the capital of France?",
  type: "multiple choice",
  answers: [
    { text: "Paris", correct: true },
    { text: "London", correct: false },
    { text: "Berlin", correct: false },
    { text: "Rome", correct: false }
  ],
  points: 10
};

addQuestion(newQuestionData);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
