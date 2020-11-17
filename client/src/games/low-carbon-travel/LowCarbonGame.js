// Component that contains the cards of the game
import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import axios from 'axios';
import classes from '../../styles/components/box.module.scss';

const LowCarbonGame = () => {
    // retrieves answers from Local Storage

    const guestAnswers = JSON.parse(window.localStorage.getItem('answers'));
    const [answers, setAnswers] = useState(guestAnswers || []);
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));

    // fetch all answers for game with id 1 from the API
    useEffect(() => {
        axios.get('/api/games/1/answers.json')
            .then(res => setAnswers(res.data))
            .catch(error => console.log(error))
          }, []);

    // stores guest answers in Local Storage
    useEffect(() => {
        window.localStorage.setItem('answers', JSON.stringify(answers));
    }, [answers])

    // saves selected answers to a new array
    const guestAnswerArray = [];
    answers.map(answer => {
        if(answer.selected === true)
            guestAnswerArray.push(answer)
    })

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');

        if(guestAnswerArray !== []) {
            guestAnswerArray.forEach(answer => {
                axios.post('/api/guest_answers', qs.stringify(
                    {
                      guest_answer:{
                        answer_id: answer.id,
                        guest_id: guestDetails.id
                    }
                    }))
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
            })
        }
    }

    // function that handles the selected key of each object in the cards array 
    const updateSelected = (id, newSelected) => {
        const newAnswers = answers.map(answer => {
            if(answer.id === id){
                return {...answer, selected: newSelected}
            }
            return answer;
        })
        setAnswers(newAnswers);
    }

    return(
        <div className={classes.BoxWrapper}>
            <h3>Choose 5 policies that you would like to see implemented:</h3>
            <div className={classes.Box}>
                {answers.map(answer => (
                    <Card key={answer.id} {...answer} updateSelected={updateSelected} />
                ))}
            </div>
            <button className="Btn" onClick={submitAnswers}>Complete!</button>
        </div>
    )
}

export default LowCarbonGame;
