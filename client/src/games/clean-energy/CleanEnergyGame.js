import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import classes from '../../styles/pages/clean-energy.module.scss';
import Intro from '../../components/Intro';
import { cleanEnergyGame, cleanEnergyAnswers} from './Data';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import Modal from '../../components/Modal';
import axios from 'axios';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';
import Result from '../../components/Result';

// images and icons

import { BiArrowBack, BiRevision } from "react-icons/bi";
import { GiElectric } from 'react-icons/gi';
import Electric from '../../images/clean-energy/electric.svg';
import Character from '../../images/clean-energy/Character_7.svg';
import Background from '../../images/clean-energy/Game_7_First_Screen.svg';
import Bulb from '../../images/clean-energy/bulb.svg';
import Bulb1 from '../../images/clean-energy/bulb_1.svg';
import Bulb2 from '../../images/clean-energy/bulb_2.svg';
import Bulb3 from '../../images/clean-energy/bulb_3.svg';


const MovableItem = ({name, setItems, column, icon}) => {
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
        item: { name, icon, type: itemTypes.CARD },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'All'){
                changeItemColumn(item, 'All')
            } else if (dropResult && dropResult.name === 'Solar'){
                changeItemColumn(item, 'Solar')
            } else if (dropResult && dropResult.name === 'Onshore Wind') {
                changeItemColumn(item, 'Onshore Wind')
            } else if (dropResult && dropResult.name === 'Investing in Hydrogen') {
                changeItemColumn(item, 'Investing in Hydrogen')
            } else if (dropResult && dropResult.name === 'Biomass') {
                changeItemColumn(item, 'Biomass')
            } else if (dropResult && dropResult.name === 'Hydroelectric Power') {
                changeItemColumn(item, 'Hydroelectric Power')
            } else if (dropResult && dropResult.name === 'Investment in Battery Storage Technologies') {
            changeItemColumn(item, 'Investment in Battery Storage Technologies')
        }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    const getDisplay = () => {
      if(column === "All") {
          return 'flex'
      } else {
          return 'none'
      }
  }

    return (
        <>
            <div ref={drag} className={classes.Card} style={{ opacity: opacity, display: getDisplay(),}}>
                <GiElectric style={{ width: '3rem', height: '3rem', fill: "#fff" }} />
            </div>
            
        </>
    )
}



const Column = ({children, className, title, description, icon}) => {

    const [, drop] = useDrop({
        accept: itemTypes.CARD,
        drop: () => ({name: title}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        canDrop: () => {
          return children.length < 3;
        }
    })

    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);  
    const closeModal = () => setShow(false);

    const getLightBulb = () => {
       if (children.length === 0) {
           return Bulb
       } else if (children.length === 1) {
           return Bulb1
       } else if (children.length === 2) {
           return Bulb2
       } else if (children.length === 3) {
            return Bulb3
        }
    };


    return (
      <div className={classes.gridItem}>
        { title !== "All" ? <img src={getLightBulb()} alt={title} onClick={openModal} style={ {width: "6rem", height: "6rem", fill: "#102773"} } /> : null }
        <div ref={drop} className={className}>
            { title !== "All" ? title : null }
            {children}        
        </div>
        { show ? <Modal title={title} description={description} show={show} closeModal={closeModal} icon={icon}/> : null }
      </div>
    )
}



const CleanEnergyGame = () => {

    const game = cleanEnergyGame;
    const [items, setItems] = useState(cleanEnergyAnswers);
    const isMobile = window.innerWidth < 600;

    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item) => item.column === columnName)
        .map((item, index) => (
            <MovableItem key={item.id} name={item.name} column={item.column} setItems={setItems} index={index} icon={Electric} />
        ))
    }


    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));

    // filters answers that are in the 5 selected columns
    const finalItems = items.filter((item) => item.column !== "All")

    // retrieves result from Local Storage
    const cleanEnergyText = JSON.parse(window.localStorage.getItem('result7'));

    const resultText = "Amazing! You and your town have got some sound policies in place, more power to you!"

    const [ cleanEnergyResult, setCleanEnergyResult ] = useState(cleanEnergyText || "") 
    // save the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result7', JSON.stringify(cleanEnergyResult));
    })

    // Logic for persisting the answers in the DB: 

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');
        
        if(finalItems.length === 10 && guestDetails) {
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
                    setCleanEnergyResult(resultText)
                    handleRedirect(res)
                })
                    .catch(err => console.log(err))
                })
        }
    }
        
    const handleRedirect = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/clean-energy/result'
        } else {
            window.location = '/clean-energy/game'
        }
    }

    const startOver = () => {
        setItems(cleanEnergyAnswers)
    }

    // gradient for the background
    const gradient = "rgba(156, 199, 66, 1),rgba(255, 255, 255, 0.6)";

    
    return(
        <Switch>
            <Route path="/clean-energy/intro">
                <Intro
                    text={game.intro}
                    skip='/nature/intro'
                    link='/clean-energy/game'
                    back='/low-carbon/result'
                    background={Background}
                    gradient={gradient}
                    character={Character}
                    characterPosition="RetrofitCharacter"
                />
            </Route>
            <Route path="/clean-energy/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/clean-energy/intro'>Back</Link>
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
                            <div className={classes.Choices}>
                                <Column title='Solar'  className={classes.Selected} description={items[0].description} >
                                    {returnItemsForColumn('Solar')}
                                </Column>
                                <Column title='Onshore Wind' className={classes.Selected} description={items[1].description} >
                                    {returnItemsForColumn('Onshore Wind')}
                                </Column>
                                <Column title='Investing in Hydrogen' className={classes.Selected} description={items[2].description} >
                                    {returnItemsForColumn('Investing in Hydrogen')}
                                </Column>
                                <Column title='Biomass' className={classes.Selected} description={items[3].description} >
                                    {returnItemsForColumn('Biomass')}
                                </Column>
                                <Column title='Hydroelectric Power' className={classes.Selected} description={items[4].description} >
                                    {returnItemsForColumn('Hydroelectric Power')}
                                </Column>
                                <Column title='Investment in Battery Storage Technologies' className={classes.Selected} description={items[5].description} >
                                    {returnItemsForColumn('Investment in Battery Storage Technologies')}
                                </Column>
                            </div>
                            {
                                (finalItems.length === 10) ? 
                                <button className="Btn" style={{margin: '4rem 0'}} onClick={submitAnswers}>Complete!</button> 
                                :                 
                                <Column title='All' className={classes.Box}>
                                    {returnItemsForColumn('All')}
                                </Column> 
                            }
                        </DndProvider>
                    </div>
                </div>
            </Route>
            <Route path="/clean-energy/result">
                <Result 
                    gradient={gradient} 
                    background={Background} 
                    badge="You've earned the BUZZ BADGE" 
                    text={cleanEnergyText}
                    back="/clean-energy/game"
                    next="/nature/intro"
                />
            </Route>
        </Switch>
    )
}

export default CleanEnergyGame;