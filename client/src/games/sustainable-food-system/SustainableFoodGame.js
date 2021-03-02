import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import classes from '../../styles/pages/sustainable-food-system.module.scss';
import Intro from '../../components/Intro';
import axios from 'axios';
import Modal from '../../components/Modal';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';
import Result from '../../components/Result';
import {sustainableFoodGame, sustainableFoodAnswers } from './Data';

// Icons and Images
import { FaAngleDown} from 'react-icons/fa';
import { BiArrowBack, BiRevision } from "react-icons/bi";
import Background from '../../images/sustainable-food-system/Game_2_background_scene.svg';
import Character from '../../images/sustainable-food-system/Character 2.svg';


const MovableItem = ({name, setItems, column, description, setInfo, index, icon}) => {
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

    const [{ isDragging }, drag] = useDrag({
        item: { name, column, icon, type: itemTypes.CARD },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'All'){
                changeItemColumn(item, 'All')
            } else if(dropResult && dropResult.name === '1') {
                changeItemColumn(item, '1') 
            } else if(dropResult && dropResult.name === '2') {
                changeItemColumn(item, '2')
            } else if(dropResult && dropResult.name === '3') {
                changeItemColumn(item, '3')
            } else if(dropResult && dropResult.name === '4') {
                changeItemColumn(item, '4')
            } else if(dropResult && dropResult.name === '5') {
                changeItemColumn(item, '5')
            } else if(dropResult && dropResult.name === '6') {
                changeItemColumn(item, '6')
            } 
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });


    const opacity = isDragging ? 0.4 : 1;

    const handleClick = () => {
        if(column === "food waste" || column === "animal agriculture & diet" || column === "localised food system") {
            setInfo([name, icon, description]);
        }
    }
    

    return (
        <div ref={drag} className={classes.Card} style={{opacity: opacity}}>
            <img src={icon} alt={name} onClick={handleClick}/>
        </div>
    )
}


const Column = ({children, className, title}) => {

    const [{isOver, canDrop}, drop] = useDrop({
        accept: itemTypes.CARD,
        drop: () => ({name: title}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        canDrop: () => {
          return children.length === 0 || title === "localised food system" || title === "animal agriculture & diet" || title === "food waste";
        }
    })


    return (
        <div ref={drop} className={className} >
            {children}
        </div>
    )

}


const Info = ({info, finalItems, submitAnswers}) => {
    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);  
    const closeModal = () => setShow(false);
    if (finalItems.length === 6)
        return <button className="Btn-border" onClick={submitAnswers}>Complete!</button>
    else
        return(
            <>
            <div className={classes.Infobox}>
                <div>
                    <img src={info[1]} alt={info[0]}/>
                    <p>{info[0]}</p>
                </div>
                <a href="#" className={classes.Link} onClick={openModal}>
                    Read more <FaAngleDown fontSize="1.5rem"/>
                </a>
            </div>
            { show? <Modal title={info[0]} description={info[2]} show={show} closeModal={closeModal} icon={info[1]}/> : null }
            </>
        )
}

const SustainableFoodGame = () => {

    const game = sustainableFoodGame;
    const [items, setItems] = useState(sustainableFoodAnswers);
    const [info, setInfo] = useState([sustainableFoodAnswers[0].name,sustainableFoodAnswers[0].svg, sustainableFoodAnswers[0].description])
    const [active, setActive] = useState([sustainableFoodAnswers[0].name]);

    const isMobile = window.innerWidth < 600;


    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item) => item.column === columnName)
        .map((item, index) => (
            <MovableItem key={item.id} name={item.name} description={item.description} column={item.column} setItems={setItems} index={index} setInfo={setInfo} active={active} setActive={setActive} icon={item.svg} />
        ))
    }

    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));
    
    // filters answers that are in the 6 selected columns
    const finalItems = items.filter((item) => item.column !== "food waste" && item.column !== "animal agriculture & diet" && item.column !== "localised food system")


    // retrieves result text from Local Storage
    const sustainableFoodText = JSON.parse(window.localStorage.getItem('result2'));

    const [ sustainableFoodResult, setSustainableFoodResult ] = useState(sustainableFoodText || "") 

    // saves the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result2', JSON.stringify(sustainableFoodResult));
    })
 
     const resultText = "Thank you for helping Gill! The UK throws away £17 billion of food every year. Going plant based could prevent 45,000 excess deaths each year. Local food vs food transported by plane carries 100 times less emissions."

    // Logic for persisting the answers in the DB: 

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');
        
        if(finalItems.length === 6 && guestDetails) {
            finalItems.forEach(answer => {
                axios.post('/api/answers', qs.stringify(
                    {
                        answer: {
                            guest_id: guestDetails.id,
                            name: answer.name,
                            description: answer.description,
                            column: answer.column,
                            category: answer.category,
                            game: answer.game
                    }
                }))
                .then(res => {
                    setSustainableFoodResult(resultText)
                    handleRedirect(res)
                })
                    .catch(err => console.log(err))
                })
        }
    }
        
    const handleRedirect = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/sustainable-food-system/result'
        } else {
            window.location = '/sustainable-food-system/game'
        }
    }
    
    const startOver = () => {
        setItems(sustainableFoodAnswers)
    }

    const displayColumn = () => {
        if (finalItems.length >= 0 && finalItems.length < 2) {
            return (
                <>
                    <h3 className={classes.Category}>Food Waste</h3>
                    <Column title='food waste' className={classes.Box}>
                        
                        {returnItemsForColumn('food waste')}
                    </Column>
                </>
            )
        } else if (finalItems.length >= 2 && finalItems.length < 4) {
            return (
                <>
                    <h3 className={classes.Category}>Animal Agriculture & Diet</h3>
                    <Column title='animal agriculture & diet' className={classes.Box}>
                        {returnItemsForColumn('animal agriculture & diet')}
                    </Column>
                </>
            )
        } else if (finalItems.length >= 4) {
            return (
                <>
                    <h3 className={classes.Category}>Localised Food System</h3>
                    <Column title='localised food system' className={classes.Box}>
                        {returnItemsForColumn('localised food system')}
                    </Column>
                </>
            )
        }
    }

    const gradient = "rgba(156, 199, 66, 1),rgba(255, 255, 255, 0.6)";

    return(
        <Switch>
            <Route path="/sustainable-food-system/intro">
                <Intro
                    text={game.intro}
                    link='/sustainable-food-system/game'
                    back='/retrofit-homes/result'
                    skip='/outro'
                    background={Background}
                    character={Character}
                    characterPosition="SustainableFoodCharacter"
                    gradient={gradient}
                />
            </Route>
            <Route path="/sustainable-food-system/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/sustainable-food-system/intro'>Back</Link>
                    </div>
                    <div className="NavLink">
                        <a className="" onClick={startOver} >Start over  </a>
                        <BiRevision className="RightIcon"/>
                    </div>
                </div>
                <div className={classes.Background}>               
                    <div className={classes.Instructions}>
                        <p>{game.instructions}</p>
                    </div>   
                    <div className={classes.Container}>            
                        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>
                        {isMobile ?  <MyPreview classes={classes} /> : null }
                            {displayColumn()}
                            <Info info={info} finalItems={finalItems} submitAnswers={submitAnswers} />
                            <div className={classes.Choices}>
                            <Column title='1' className={classes.Selected}>
                                {returnItemsForColumn('1')}
                            </Column>
                            <Column title='2' className={classes.Selected}>
                                {returnItemsForColumn('2')}
                            </Column>
                            <Column title='3' className={classes.Selected}>
                                {returnItemsForColumn('3')}
                            </Column>
                            <Column title='4' className={classes.Selected}>
                                {returnItemsForColumn('4')}
                            </Column>
                            <Column title='5' className={classes.Selected}>
                                {returnItemsForColumn('5')}
                            </Column>
                            <Column title='6' className={classes.Selected}>
                                {returnItemsForColumn('6')}
                            </Column>
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </Route>
            <Route path="/sustainable-food-system/result">
                <Result 
                    gradient={gradient} 
                    background={Background} 
                    text={sustainableFoodText} 
                    badge="You've earned the FOOD BADGE"
                    back="/sustainable-food-system/game"
                    next="/outro"
                />
            </Route>
        </Switch>
    )
}

export default SustainableFoodGame;