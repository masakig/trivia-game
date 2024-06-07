import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TriviaGame = () => {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:5000/questions/random');
      setQuestion(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect = selectedAnswer.correct;
    if (isCorrect) {
      setScore(score + question.points);
    }
    fetchQuestion(); // Fetch next question
  };

  return (
    <div>
      {question && (
        <div>
          <h2>{question.question}</h2>
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer)}>
                {answer.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>Score: {score}</p>
    </div>
  );
};

export default TriviaGame;
