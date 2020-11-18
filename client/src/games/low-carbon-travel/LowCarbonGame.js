// Component that contains the cards of the game
import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import axios from 'axios';
import classes from '../../styles/components/box.module.scss';


const LowCarbonGame = (name) => {

    const [answers, setAnswers] = useState([]);

    // const [topics, setTopics] = useState([]);

    // const fetchData = async () => {
    //     const resp = await axios.get('api/topics.json');
    //     if(resp.data != null) {
    //         setTopics(resp.data);
    //     }
    // };
    
    
    // useEffect(() => {
    //     fetchData();
    // }, [])

    useEffect(() => {
        axios.get('/api/games/1/answers.json')
            .then(res => setAnswers(res.data))
          }, []);

          console.log(answers)

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
                    <Card key={answer.id} {...answer} updateSelected={updateSelected} name="Card" />
                ))}
            </div>
            <button className="Btn">Complete!</button>
        </div>
    )
}

export default LowCarbonGame;
