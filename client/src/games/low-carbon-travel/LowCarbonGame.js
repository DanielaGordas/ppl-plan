// Component that contains the cards of the game
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '../../styles/pages/lowcarbon.module.scss'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import { Switch, Route } from 'react-router-dom';
import LowCarbonInfo from './LowCarbonInfo';
import Card from '../../components/Card';
import Intro from '../../components/Intro';

const LowCarbonGame = () => {

    // retrieves game data from Local Storage
    const lowcarbon = JSON.parse(window.localStorage.getItem('lowcarbon'));
    const [game, setGame] = useState(lowcarbon || {})

    // saves the game data in Local Storage
    useEffect(() => {
        window.localStorage.setItem('lowcarbon', JSON.stringify(game));
    }, [game])

    const [answers, setAnswers] = useState(game.answers);


     // fetch the first game from the API
    useEffect(() => {
        axios.get('/api/games/1.json')
            .then(res => setGame(res.data))
            .catch(error => console.log(error))
          }, []);
    
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

    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));

    // const [guestAnswers, setGuestAnswers] = useState([])

    // console.log(guestAnswers);

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');

        if(boxes["2"].items.length === 5 && guestDetails) {
            boxes["2"].items.forEach(answer => {
                axios.post('/api/guest_answers', qs.stringify(
                    {
                      guest_answer:{
                        answer_id: answer.id,
                        guest_id: guestDetails.id
                    }
                    }))
                    .then(res => {
                        // setGuestAnswers(res.data)
                        handleRedirect(res)
                    })
                    .catch(err => console.log(err))
            })
        }
    }


    const handleRedirect = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/lowcarbon/result'
        } else {
            window.location = '/lowcarbon/game'
        }
    }



    const isDropDisabled = boxes["2"].items.length === 5
    // handles the end of drag event inside each box and also from one box to the other

    const massTransit = [];
    const electricCars = [];

    boxes["2"].items.map(item => {
        if (item.category === "Electric car ownership") {
            electricCars.push(item);
        }
    })

    boxes["2"].items.forEach(item => {
        if (item.category === "Mass transit") {
            massTransit.push(item);
        }
    })

    const setNeedleStyle = () => {
        let style = {};
        if (electricCars.length - massTransit.length === 1) {
            const firstStyle = {transform: 'translate(-50%, -50%) rotate(-30deg)'};
            style = Object.assign(style, firstStyle);
        }
        if (electricCars.length - massTransit.length === 2) {
            const secondStyle = {transform: 'translate(-50%, -50%) rotate(-45deg)'};
            style = Object.assign(style, secondStyle);
        }
        if (electricCars.length - massTransit.length === 3) {
            const thirdStyle = {transform: 'translate(-50%, -50%) rotate(-55deg)'};
            style = Object.assign(style, thirdStyle);
        }
        if (electricCars.length - massTransit.length === 4) {
            const fourthStyle = {transform: 'translate(-50%, -50%) rotate(-65deg)'};
            style = Object.assign(style, fourthStyle);
        }
        if (massTransit.length - electricCars.length === 1) {
            const fifthStyle = {transform: 'translate(-50%, -50%) rotate(+30deg)'};
            style = Object.assign(style, fifthStyle);
        }
        if (massTransit.length - electricCars.length === 2) {
            const sixthStyle = {transform: 'translate(-50%, -50%) rotate(+45deg)'};
            style = Object.assign(style, sixthStyle);
        }
        if (massTransit.length - electricCars.length === 3) {
            const seventhStyle = {transform: 'translate(-50%, -50%) rotate(+55deg)'};
            style = Object.assign(style, seventhStyle);
        }
        if (massTransit.length - electricCars.length === 4) {
            const eigthStyle = {transform: 'translate(-50%, -50%) rotate(+65deg)'};
            style = Object.assign(style, eigthStyle);
        }
        if (massTransit.length - electricCars.length === 0) {
            const ninthStyle = {transform: 'translate(-50%, -50%) rotate(0deg)'};
            style = Object.assign(style, ninthStyle);
        }
        if (massTransit.length - electricCars.length === 5) {
            const tenthStyle = {transform: 'translate(-50%, -50%) rotate(+90deg)'};
            style = Object.assign(style, tenthStyle);
        }
        if (electricCars.length - massTransit.length === 5) {
            const eleventhStyle = {transform: 'translate(-50%, -50%) rotate(-90deg)'};
            style = Object.assign(style, eleventhStyle);
        }

        return style;
    }

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

    return(
        <Switch>
            <Route exact path="/lowcarbon">
                <LowCarbonInfo />
            </Route>
            <Route path="/lowcarbon/intro">
                <Intro text={game.description} link='/lowcarbon/game' />
            </Route>
            <Route path="/lowcarbon/game">
                <div className={classes.Instructions}>
                    <h3>{game.name}</h3>
                    <p>{game.instructions}</p>
                </div>
                <div className={classes.BoxWrapper}>
                    <DragDropContext onDragEnd={result => onDragEnd(result, boxes, setBoxes)}>
                        {Object.entries(boxes).map(([id, box]) => {
                            return(
                                <div className={classes.BoxWrapper} key={id}>
                                    <Droppable droppableId={id} direction="horizontal" isDropDisabled={isDropDisabled}>
                                        {(provided, snapshot) => {
                                            return(
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}

                                                    style={{
                                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'
                                                    }}
                                                    className={classes.Box}
                                                >
                                                    {box.items.map((item, index) => {
                                                        return(
                                                        <Card key={item.id} item={item} index={index}/>
                                                        )
                                                        
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            )
                        })}
                    </DragDropContext>
                    {/* { showInfo ? <InfoCard/> : null } */}

                    <div className={classes.Speedometer}>
                        <div className={classes.HalfCircle}></div>
                        <div className={classes.Needle} style={setNeedleStyle()}></div>
                        <div className={classes.Bottom}></div>
                    </div>

                    <button className="Btn" onClick={submitAnswers}>Complete!</button>
                </div>
            </Route>
            <Route path="/lowcarbon/result">
                <h1>result badges for lowcarbon game</h1>
            </Route>
        </Switch>
    )
}

export default LowCarbonGame;
