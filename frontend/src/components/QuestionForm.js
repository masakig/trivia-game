import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([{ text: '', correct: false }]);
    const [type, setType] = useState('multiple-choice');

    const handleAddAnswer = () => {
        setAnswers([...answers, { text: '', correct: false }]);
    };

    const handleAnswerChange = (index, event) => {
        const newAnswers = answers.slice();
        newAnswers[index][event.target.name] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newQuestion = { question, answers, type };
        try {
            await axios.post('http://localhost:5000/questions', newQuestion);
            setQuestion('');
            setAnswers([{ text: '', correct: false }]);
            setType('multiple-choice');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
            </div>
            <div>
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="numeric">Numeric</option>
                </select>
            </div>
            {answers.map((answer, index) => (
                <div key={index}>
                    <input type="text" name="text" value={answer.text} onChange={(e) => handleAnswerChange(index, e)} required />
                    <input type="checkbox" name="correct" checked={answer.correct} onChange={(e) => handleAnswerChange(index, e)} />
                </div>
            ))}
            <button type="button" onClick={handleAddAnswer}>Add Answer</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default QuestionForm;
 
