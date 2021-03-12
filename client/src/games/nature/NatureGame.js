import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import classes from '../../styles/pages/nature.module.scss';
import Intro from '../../components/Intro';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import Modal from '../../components/Modal';
import axios from 'axios';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';
import { natureGame, natureAnswers} from './Data';
import Result from '../../components/Result';

// images and icons

import { BiArrowBack, BiRevision } from "react-icons/bi";
import Character from '../../images/nature/Character 6.svg';
import Background from '../../images/nature/Game_6_First_Screen.svg';

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
        item: { name, type: itemTypes.CARD},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'All'){
                changeItemColumn(item, 'All')
            } else if (dropResult && dropResult.name === 'One'){
                changeItemColumn(item, 'One')
            } else if (dropResult && dropResult.name === 'Two') {
                changeItemColumn(item, 'Two')
            } else if (dropResult && dropResult.name === 'Three') {
                changeItemColumn(item, 'Three')
            } else if (dropResult && dropResult.name === 'Four') {
                changeItemColumn(item, 'Four')
            } else if (dropResult && dropResult.name === 'Five') {
                changeItemColumn(item, 'Five')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // const opacity = isDragging ? 0.4 : 1;

    const getDisplay = () => {
        if(column === "All") {
            return 'flex'
        } else {
            return 'block'
        }
    }

    return (
        <>
            <div ref={drag} className={classes.Card} style={{ display: getDisplay() }} onClick={openModal} >
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
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        canDrop: () => {
          return children.length === 0 || title === "All";
        }
    })

    return (
        <div ref={drop} className={className} >
            {children}
        </div>
    )
}



const NatureGame = () => {

    const game  = natureGame;
    const [items, setItems] = useState(natureAnswers);
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

    // retrieves result text from Local Storage
    const natureText = JSON.parse(window.localStorage.getItem('result6'));

    const [ natureResult, setNatureResult ] = useState(natureText || "") 

    // saves the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result6', JSON.stringify(natureResult));
    })

    const resultText = "Nature is important for removing pollution, protecting against flooding and helps improve everyone’s mental and physical health."

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
                    setNatureResult(resultText)
                    handleRedirect(res)
                })
                    .catch(err => console.log(err))
                })
        }
    }
        
    const handleRedirect = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/nature/result'
        } else {
            window.location = '/nature/game'
        }
    }

    const startOver = () => {
        setItems(natureAnswers)
    }

    // gradient for the background
    const gradient = "rgba(169, 219, 232, 1), rgba(255, 255, 255, 0.6)"

    
    return(
        <Switch>
            <Route path="/nature/intro">
                <Intro
                    text={game.intro}
                    skip='/research-development/intro'
                    link='/nature/game'
                    back='/clean-energy/result'
                    gradient={gradient}
                    character={Character}
                    background={Background}
                    characterPosition="NatureCharacter"
                />
            </Route>
            <Route path="/nature/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/nature/intro'>Back</Link>
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
                                (finalItems.length === 5) ? 
                                <button className="Btn" style={{margin: '4rem 0'}} onClick={submitAnswers}>Complete!</button> 
                                :                  
                                <Column title='All' className={classes.Box}>
                                    {returnItemsForColumn('All')}
                                </Column> 
                            }
                            <div className={classes.Choices}>
                                <Column title='One' className={classes.Selected}>
                                    {returnItemsForColumn('One')}
                                </Column>
                                <Column title='Two' className={classes.Selected}>
                                    {returnItemsForColumn('Two')}
                                </Column>
                                <Column title='Three' className={classes.Selected}>
                                    {returnItemsForColumn('Three')}
                                </Column>
                                <Column title='Four' className={classes.Selected}>
                                    {returnItemsForColumn('Four')}
                                </Column>
                                <Column title='Five' className={classes.Selected}>
                                    {returnItemsForColumn('Five')}
                                </Column>
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </Route>
            <Route path="/nature/result">
                <Result 
                    gradient={gradient} 
                    background={Background} 
                    text={natureText} 
                    badge="You've earned the NATURE BADGE"
                    back="/nature/game"
                    next="/research-development/intro"
                />
            </Route>
        </Switch>
    )
}

export default NatureGame;