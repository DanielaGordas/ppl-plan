import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import classes from '../../styles/pages/circular-economy.module.scss';
import Intro from '../../components/Intro';
import '../../styles/components/button.scss';
import { circularEconomyGame, circularEconomyAnswers } from './Data';
import '../../styles/components/nav.scss';
import Modal from '../../components/Modal';
import axios from 'axios';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';
import Result from '../../components/Result';

// Images and icons

import Character from '../../images/circular-economy/Character_Game_4.svg';
import Background from '../../images/circular-economy/Game_4_First_Screen.svg';
import { BiArrowBack, BiRevision } from "react-icons/bi";

const MovableItem = ({name, setItems, column, index, icon, description}) => {
    const changeItemColumn = (currentItem, columnName) => {
        setItems((prevState) => {
            return prevState.map(e => {
                return {
                    ...e,
                    column: e.name === currentItem.name ? columnName : e.column,
                }
            })
        });
    }

    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);  
    const closeModal = () => setShow(false);

    const [{ isDragging }, drag] = useDrag({
        item: { name, icon, type: itemTypes.CARD },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'All'){
                changeItemColumn(item, 'All')
            } else if (dropResult && dropResult.name === 'Now'){
                changeItemColumn(item, 'Now')
            } else if (dropResult && dropResult.name === 'Future') {
                changeItemColumn(item, 'Future')
            } else {
                changeItemColumn(item, 'Never')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // const opacity = isDragging ? 0.4 : 1;

    const getDisplay = () => {
        if(column === "All" && index === 0) {
            return 'flex'
        } else {
            return 'none'
        }
    }

    return (
        <>
            <div ref={drag} className={classes.Card} style={{ display: getDisplay() }} onClick={openModal}>
                <img src={icon} alt={name}/>
                <p>{name}</p>
            </div>
            { show? <Modal title={name} description={description} show={show} closeModal={closeModal} icon={icon}/> : null }
        </>
    )
}



const Column = ({children, className, title}) => {

    const [, drop] = useDrop({
        accept: itemTypes.CARD,
        drop: () => ({name: title}),
    })

    return (
        <>
        <div ref={drop} className={className}>
            <div className={classes.TopBorder}>
                <div className={classes.Top}>
                </div>
            </div>
            <div className={classes.Bottom}>
                <h4> {title !== "All" ? title : null}</h4>
                <p>{ title !== "All" ? children.length : null}</p>
            </div>
            {children}
        </div>
        </>
    )
}



const CircularEconomyGame = () => {

    const game = circularEconomyGame;
    const [items, setItems] = useState(circularEconomyAnswers);
    const isMobile = window.innerWidth < 600;

    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item) => item.column === columnName)
        .map((item, index) => (
            <MovableItem key={item.id} name={item.name} description={item.description} column={item.column} setItems={setItems} index={index} icon={item.svg} />
        ))
    }


    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));

    // filters answers that are in the 5 selected columns
    const finalItems = items.filter((item) => item.column !== "All")


    const now = [];
    const future = [];
    const never= [];


    items.map(item => {
        if (item.column === 'Now') {
            now.push(item);
        } else if (item.column === "Future"){
            future.push(item);
        } else if (item.column === "Never"){
            never.push(item);
        }
        return item;
    })

    // decides the result of the game   
    const result = () => {
        let result = "";
        if(now.length > future.length && now.length > never.length) {
            result = "Wow! You’re really progressive.";
        } else if (future.length > now.length && future.length > never.length) {
            result = "Great choices, you’ve selected a mix of acting now and making changes in the future.";
        } else if (never.length > now.length && never.length > future.length) {
            result = "It looks like you’re happy with the way things are. This might cause some waste issues. You need to make some more ambitious choices before we can award you the badge.";
        } else {
            result = "Great choices, you’ve selected a mix of acting now and making changes in the future.";
        }
        return result;
    }

    // retrieves result from Local Storage
    const circularEconomyText = JSON.parse(window.localStorage.getItem('result4'));

    const [circularEconomyResult, setCircularEconomyResult] = useState(circularEconomyText || "");

    // save the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result4', JSON.stringify(circularEconomyResult));
    }, [circularEconomyResult])

    // Logic for persisting the answers in the DB: 

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');
        
        if(finalItems.length >= 5 && guestDetails) {
            finalItems.forEach(answer => {
                axios.post('/api/answers', qs.stringify(
                    {
                        answer: {
                            guest_id: guestDetails.id,
                            name: answer.name,
                            description: answer.description,
                            column: answer.column,
                            game: answer.game
                    }
                }))
                .then(res => {
                    setCircularEconomyResult(result())
                    handleRedirect(res)
                })
                    .catch(err => console.log(err))
                })
        }
    }
        
    const handleRedirect = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/circular-economy/result'
        } else {
            window.location = '/circular-economy/game'
        }
    }

    const startOver = () => {
        setItems(circularEconomyAnswers)
    }

    // gradient for the background
    const gradient = "rgba(156, 199, 66, 1),rgba(255, 255, 255, 0.6)";

    
    return(
        <Switch>
            <Route path="/circular-economy/intro">
                <Intro
                    text={game.intro}
                    skip='/retrofit-homes/intro'
                    link='/circular-economy/game'
                    back='/research-development/result'
                    background={Background}
                    character={Character}
                    characterPosition="CircularCharacter"
                    gradient={gradient}
                />
            </Route>
            <Route path="/circular-economy/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/circular-economy/intro'>Back</Link>
                    </div>
                    <div className="NavLink">
                        <a className="" onClick={startOver} >Start over</a>
                        < BiRevision className="RightIcon"/>
                    </div>
                </div>
                <div className={classes.Background}>
                    <div className={classes.Instructions}>
                        <p>{game.instructions}</p>
                    </div>   
                    <div className={classes.Container}>            
                        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>
                            {isMobile ?  <MyPreview classes={classes} /> : null }         
                            {
                                ( finalItems.length === 9 ) ? 
                                <button className="Btn" style={{margin: '4rem 0'}} onClick={submitAnswers}>Complete!</button> 
                                :                  
                                <Column title='All' className={classes.FirstColumn}>
                                    {returnItemsForColumn('All')}
                                </Column> 
                            }
                            <div className={classes.Choices}>
                                <Column title='Now' className={classes.SecondColumn}>
                                    {returnItemsForColumn('Now')}
                                </Column>
                                <Column title='Future' className={classes.SecondColumn}>
                                    {returnItemsForColumn('Future')}
                                </Column>
                                <Column title='Never' className={classes.SecondColumn}>
                                    {returnItemsForColumn('Never')}
                                </Column>
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </Route>
            <Route path="/circular-economy/result">
                < Result 
                    gradient={gradient} 
                    background={Background} 
                    badge={circularEconomyText !== "It looks like you’re happy with the way things are. This might cause some waste issues. You need to make some more ambitious choices before we can award you the badge." ? "You've earned the SHARING ECONOMY BADGE" : null }
                    text={circularEconomyText}
                    back="/circular-economy/game"
                    next="/retrofit-homes/intro"
                />
            </Route>
        </Switch>
    )
}

export default CircularEconomyGame;