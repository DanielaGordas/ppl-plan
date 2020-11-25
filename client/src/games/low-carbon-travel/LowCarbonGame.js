// Component that contains the cards of the game
import React, { useState, useEffect } from 'react';
import Box from '../../components/Box';
import axios from 'axios';
import classes from '../../styles/components/box.module.scss';
import {DragDropContext} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const LowCarbonGame = () => {
    // retrieves answers from Local Storage
    const guestAnswers = JSON.parse(window.localStorage.getItem('answers'));
    const [answers, setAnswers] = useState(guestAnswers || []);

    const initialBoxes = {
        "1": {
            name: 'InitialOptions',
            items: answers
        },

        "2": {
            name: 'SelectedOptions',
            items: []
        }
    }
    const [boxes, setBoxes] = useState(initialBoxes);
    const [selectedBox, setSelectedBox] = useState(boxes["2"]);

    // retrieves guest user details from localStorage
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

    const guestAnswerArray = [];
    // saves selected answers to a new array
    useEffect(() => {
        answers.map(answer => {
            if(answer.selected === true)
                guestAnswerArray.push(answer)
        })
    }, [answers])

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');

        if(guestAnswerArray !== [] && guestDetails) {
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
    // const updateSelected = (item) => {
    //     const newAnswers = answers.map(answer => {
    //         if(answer.id === item.id){
    //             return {...answer, selected: !item.selected}
    //         }
    //         return answer;
    //     })
    //     setAnswers(newAnswers);
    // }

    // handles the end of drag event inside each box and also from one box to the other
    const onDragEnd = (result, boxes, setBoxes) => {
        if(!result.destination) return;
        const {source, destination} = result;
        if(source.droppableId !== destination.droppableId) {
            const sourceBox = boxes[source.droppableId];
            const destBox = boxes[destination.droppableId];
            const sourceItems = [...sourceBox.items];
            const destItems = [...destBox.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            // changes the selected field from true to false and viceversa
            removed.selected = !removed.selected;
            setBoxes({
                ...boxes,
                [source.droppableId] : {
                    ...sourceBox,
                    items: sourceItems
                },
                [destination.droppableId] : {
                    ...destBox,
                    items: destItems
                }
            })

        } else {
            const box = boxes[source.droppableId];
            const copiedItems = [...box.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setBoxes({
                ...boxes,
                [source.droppableId]: {
                    ...box,
                    items: copiedItems
                }
    
            })
        }
    };

    console.log(answers);

    return(
        <div className={classes.BoxWrapper}>
            <h3>Choose 5 policies that you would like to see implemented:</h3>
            <DragDropContext onDragEnd={result => onDragEnd(result, boxes, setBoxes)}>
                {Object.entries(boxes).map(([id, box]) => {
                    return(
                        <Box id={id} items={box.items} key={id}/>
                    )
                })}
            </DragDropContext>
            <button className="Btn" onClick={submitAnswers}>Complete!</button>
        </div>
    )
}

export default LowCarbonGame;
