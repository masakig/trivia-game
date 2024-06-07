import React from 'react';
import QuestionForm from './components/QuestionForm';
import Game from './components/Game';

const App = () => {
    return (
        <div>
            <h1>Trivia Game</h1>
            <QuestionForm />
            <Game />
        </div>
    );
};

export default App;
