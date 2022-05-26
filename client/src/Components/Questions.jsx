import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question.jsx';

const Questions = ({user, setUser}) => {
  const [questions, setQuestions] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attemptedQs, setAttemptedQs] = useState(0);
  useEffect(() => {
    const getQuestions = () => {
      console.log(user);
      axios.get(process.env.TRIVIA_URL)
        .then(({data}) => {
          setQuestions(data.results);
        })
        .then(()=>{
          axios.patch(`${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`, {
            totalGames: user.totalGames + 1,
          });
        })
        .catch((err)=>{
          console.error(err, `something went wrong updating total games for ${user.username}`);
        });
    };
    getQuestions();
  }, []);
  
  return (
    <div className='questions'>
      {
        questions ? 
          questions.map((question, index) => {
            return <div className='Question'><Question setCorrectAnswers = {setCorrectAnswers} correctAnswers = {correctAnswers} setUser={setUser} user = {user} question = {question} key = {`q${index}`} totalQs={questions.length} attemptedQs={attemptedQs} setAttemptedQs={setAttemptedQs}/></div>;
          }) : 
          'Loading Questions...'
      }
    </div>
  );
};

export default Questions;
