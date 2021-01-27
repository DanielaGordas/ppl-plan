import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import classes from '../../styles/pages/clean-energy.module.scss';
import Intro from '../../components/Intro';
import CleanEnergyResult from './CleanEnergyResult';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import Modal from '../../components/Modal';
import axios from 'axios';


// images and icons

import { BiArrowBack, BiRevision } from "react-icons/bi";
import Guy from '../../images/retrofit-homes/Character 3a.svg';


const MovableItem = ({name, setItems, column}) => {
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
        item: { name, type:'Our first type'},
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
                {name}
            </div>
            
        </>
    )
}



const Column = ({children, className, title, description, icon}) => {

    const [, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        canDrop: () => {
          return children.length <= 3;
        }
    })

    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);  
    const closeModal = () => setShow(false);

    return (
      <>
        <div ref={drop} className={className} onClick={openModal}>
            { title !== "All" ? title : null }
            {children}        
        </div>
        { show ? <Modal title={title} description={description} show={show} closeModal={closeModal} icon={icon}/> : null }
      </>
    )
}



const CleanEnergyGame = () => {

    const cleanEnergyGame = {
        id: 7, 
        title: "Clean Energy",
        intro: "Your town is mapping a pathway to carbon neutral. Keeping the lights on whilst achieving this target will require some ambitious thinking. Help choose a path.",
        instructions: "You have 10 power tokens. Use them wisely. You can invest up to three tokens in any one idea. The more tokens you put into an idea the more the town will focus on that policy. Drag the tokens onto the lightbulb to invest."
    }


    const cleanEnergyAnswers = [
        {
            id: 1, 
            name: "One",
            description: "Solar energy is one of the cheapest renewables to harness, and will help boost the economy by creating 200,000 jobs in the solar industry by 2030. Batteries can store surplus energy generated in the daytime to be used at night. Solar energy is likely to become 20-50% cheaper than previously estimated with annual electricity bill savings in the region of £270 for the average family home.",
            column: 'All',
            game: "Clean Energy",
            svg: ""
        },
        {
            id: 2, 
            name: "Two",
            description: "Onshore wind is the cheapest form of energy and one of the fastest growing sustainable sources of energy. It can have enormous social and economic benefits in local areas by creating jobs. Wind already generates clean power to meet the annual needs of more than 7.25 million homes in the UK and produced 9% of the UK’s power needs in 2017.",
            column: 'All',
            game: "Clean Energy",
            svg: ""
        },
        {
            id: 3, 
            name: "Three",
            description: "Hydrogen is still a technology in development, but could be a good solution for storing the energy produced by renewables as it can be stored like petrol in a tank, and used at source. So could be useful for moving the emission free cars of the future. It can also be stored in the long term so is important for times when other renewable sources aren’t running (e.g. less solar power in winter).",
            column: 'All',
            game: "Clean Energy",
            svg: ""
        },
        {
            id: 4, 
            name: "Four",
            description: "This is a fuel that uses chemical processes like burning or using bacteria to create methane. This is just another form of the sun’s energy and is often what becomes of the food waste some local council collect. Biomass provided 11% of the UK’s electricity in 2019. Crucially, biomass is much more sustainable when created as a product of waste, rather than produced from crops grown specifically for bioenergy.",
            column: 'All',
            game: "Clean Energy",
            svg: ""
        },
        {
            id: 5, 
            name: "Five",
            description: "This form of energy harnesses power from water in motion, such as rivers. The process does not produce greenhouse gas emissions but can require large areas to be flooded to make room for the dam holding back the water. Hydroelectric power plants can supply electricity to remote communities and attract industry and commerce, boosting the local economy.",
            column: 'All',
            game: "Clean Energy",
            svg: ""
        },
        {
            id: 6, 
            name: "Six",
            description: "To make renewable energy supply consistently accessible to areas with intermittent wind and solar power, investment in new storage methods will be necessary. If the UK introduces battery storage on a large scale we could save at least £8 billion per year up to 2030 and create many jobs in research and development. Costs will rapidly fall - for example in Germany, small-scale household lithium-ion battery prices have fallen by over 60% since late 2014.",
            column: 'All',
            game: "Clean Energy",
            svg: ""
        },
        {
          id: 7, 
          name: "Seven",
          description: "To make renewable energy supply consistently accessible to areas with intermittent wind and solar power, investment in new storage methods will be necessary. If the UK introduces battery storage on a large scale we could save at least £8 billion per year up to 2030 and create many jobs in research and development. Costs will rapidly fall - for example in Germany, small-scale household lithium-ion battery prices have fallen by over 60% since late 2014.",
          column: 'All',
          game: "Clean Energy",
          svg: ""
        },
        {
          id: 8, 
          name: "Eight",
          description: "To make renewable energy supply consistently accessible to areas with intermittent wind and solar power, investment in new storage methods will be necessary. If the UK introduces battery storage on a large scale we could save at least £8 billion per year up to 2030 and create many jobs in research and development. Costs will rapidly fall - for example in Germany, small-scale household lithium-ion battery prices have fallen by over 60% since late 2014.",
          column: 'All',
          game: "Clean Energy",
          svg: ""
        },
        {
          id: 9, 
          name: "Nine",
          description: "To make renewable energy supply consistently accessible to areas with intermittent wind and solar power, investment in new storage methods will be necessary. If the UK introduces battery storage on a large scale we could save at least £8 billion per year up to 2030 and create many jobs in research and development. Costs will rapidly fall - for example in Germany, small-scale household lithium-ion battery prices have fallen by over 60% since late 2014.",
          column: 'All',
          game: "Clean Energy",
          svg: ""
        },
        {
          id: 10, 
          name: "Ten",
          description: "To make renewable energy supply consistently accessible to areas with intermittent wind and solar power, investment in new storage methods will be necessary. If the UK introduces battery storage on a large scale we could save at least £8 billion per year up to 2030 and create many jobs in research and development. Costs will rapidly fall - for example in Germany, small-scale household lithium-ion battery prices have fallen by over 60% since late 2014.",
          column: 'All',
          game: "Clean Energy",
          svg: ""
        },
    ]

    const [game, setGame] = useState(cleanEnergyGame);
    const [items, setItems] = useState(cleanEnergyAnswers);
    const isMobile = window.innerWidth < 600;

    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item) => item.column === columnName)
        .map((item, index) => (
            <MovableItem key={item.id} name={item.name} column={item.column} setItems={setItems} index={index} />
        ))
    }


    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));

    // filters answers that are in the 5 selected columns
    const finalItems = items.filter((item) => item.column !== "All")


    // retrieves result from Local Storage
    const cleanEnergyText = JSON.parse(window.localStorage.getItem('result7'));

    const [cleanEnergyResult, setCleanEnergyResult] = useState(cleanEnergyText || "Amazing! You and your town have got some sound policies in place. You have earned the Buzz Badge.")
    // save the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result7', JSON.stringify(cleanEnergyResult));
    }, [cleanEnergyResult])

    // Logic for persisting the answers in the DB: 

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');
        
        if(finalItems.length == 10 && guestDetails) {
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
                    skip='/outro'
                    link='/clean-energy/game'
                    back='/nature/result'
                    gradient={gradient}
                    guy={Guy}
                    guyPosition="RetrofitCharacter"
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
                        <h3>{game.title}</h3>
                        <p>{game.instructions}</p>
                    </div>   
                    <div className={classes.Container}>            
                        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>                
                            <div className={classes.Choices}>
                                <Column title='Solar'  className={classes.Selected} description={items[0].description} icon={items[0].svg}>
                                    {returnItemsForColumn('Solar')}
                                </Column>
                                <Column title='Onshore Wind' className={classes.Selected} description={items[1].description} icon={items[2].svg}>
                                    {returnItemsForColumn('Onshore Wind')}
                                </Column>
                                <Column title='Investing in Hydrogen' className={classes.Selected} description={items[2].description} icon={items[2].svg}>
                                    {returnItemsForColumn('Investing in Hydrogen')}
                                </Column>
                                <Column title='Biomass' className={classes.Selected} description={items[3].description} icon={items[3].svg}>
                                    {returnItemsForColumn('Biomass')}
                                </Column>
                                <Column title='Hydroelectric Power' className={classes.Selected} description={items[4].description} icon={items[4].svg}>
                                    {returnItemsForColumn('Hydroelectric Power')}
                                </Column>
                                <Column title='Investment in Battery Storage Technologies' className={classes.Selected} description={items[5].description} icon={items[5].svg}>
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
                <CleanEnergyResult gradient={gradient}/>
            </Route>
        </Switch>
    )
}

export default CleanEnergyGame;