import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import classes from '../../styles/pages/nature.module.scss';
import Intro from '../../components/Intro';
import NatureResult from './NatureResult';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import Modal from '../../components/Modal';
import axios from 'axios';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';


// images and icons

import { BiArrowBack, BiRevision } from "react-icons/bi";
import Character from '../../images/nature/Character 6.svg';
import Background from '../../images/nature/Game_6_First_Screen.svg';
import GreenRoofs from '../../images/nature/Game_6_Green_roofs_walls_icon.svg';
import WildRoad from '../../images/nature/Game_6_Wild_road_verges_icon.svg';
import GreenBridges from '../../images/nature/Game_6_Green_bridges_icon.svg';
import PublicParks from '../../images/nature/Game_6_Public_parks_icon.svg';
import UrbanRewilding from '../../images/nature/Game_6_Urban_rewilding_schemes_icon.svg';
import CommunityGardens from '../../images/nature/Game_6_Community_gardens_icon.svg';
import RewildedAreas from '../../images/nature/Game_6_Rewilded_areas_town_icon.svg';
import WoodlandAreas from '../../images/nature/Game_6_Woodland_areas_icon.svg';
import Ponds from '../../images/nature/Game_6_Ponds_icon.svg';

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

    const opacity = isDragging ? 0.4 : 1;

    const getDisplay = () => {
        if(column === "All") {
            return 'flex'
        } else {
            return 'block'
        }
    }

    return (
        <>
            <div ref={drag} className={classes.Card} style={{ opacity: opacity, display: getDisplay() }} onClick={openModal} >
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

    const natureGame = {
        id: 6, 
        title: "Nature",
        intro: "You’re a teacher in charge of the upcoming class field trip. You plan to show the students some of the best examples of urban nature.Pick your favourite 5 from the wide selection your town has to offer.",
        instructions: "Go through the options and select the top 5 places you want to visit to show off to the students how green their town is. Tap to read more, and drag into the numbered list once you’ve come to your decision."
    }


    const natureAnswers = [
        {
            id: 1, 
            name: "Green roofs and walls",
            description: "Roof gardens help reduce the heating of buildings and energy costs up to 50%. It creates habitats for wildlife, captures and harvests rainwater, and when deployed at scale can help cool the entire city down during increasingly hot summers.",
            column: 'All',
            game: "Nature",
            svg: GreenRoofs
        },
        {
            id: 2, 
            name: "Wild road verges",
            description: "Road sides can accommodate billions of plants and wildflowers, creating an important habitat for many of the UK's threatened animal species. This practice also saves thousands of pounds on grass cutting and upkeep.",
            column: 'All',
            game: "Nature",
            svg: WildRoad
        },
        {
            id: 3, 
            name: "Green bridges",
            description: "Green bridges provide safe road crossings for animals and will help to connect ecosystems around the UK. More connected green spaces enable a greater diversity of wildlife to thrive in our country.",
            column: 'All',
            game: "Nature",
            svg: GreenBridges
        },
        {
            id: 4, 
            name: "Public parks",
            description: "Good access to quality green spaces such as parks and wild meadows significantly improves our physical health and mental wellbeing. It’s even estimated that better provision of parks could save an £2.1 billion in healthcare costs.",
            column: 'All',
            game: "Nature",
            svg: PublicParks
        },
        {
            id: 5, 
            name: "Urban rewilding schemes",
            description: "Recently introduced urban rewilding, such as in churchyards and retail parks, will help to clean air and capture carbon emissions produced in built up areas. It also sees our underutilised assets turned into natural havens, bringing even more life back to the town.",
            column: 'All',
            game: "Nature",
            svg: UrbanRewilding
        },
        {
            id: 6, 
            name: "Community gardens",
            description: "Wildflowers in gardens have huge potential to help pollinators such as bees. A network of small patches could help bees thrive in urban areas.",
            column: 'All',
            game: "Nature",
            svg: CommunityGardens
        },
        {
            id: 7, 
            name: "Rewilded areas near the town",
            description: "Setting land aside for nature, connected with pathways to allow free movement of species, would improve climate resilience and capture carbon emissions. If these are located near to towns they can also act as educational spaces for learning about nature.",
            column: 'All',
            game: "Nature",
            svg: RewildedAreas
        },
        {
            id: 8, 
            name: "Woodland areas",
            description: "Woodland plays a vital role in recycling carbon dioxide and water vapour, as well as regulating water flow into rivers and helping to prevent flood risk.",
            column: 'All',
            game: "Nature",
            svg: WoodlandAreas
        },
        {
            id: 9, 
            name: "Ponds",
            description: "Ponds support local wildlife and can improve biodiversity. They also have a secondary function as a flood defence, providing storage for if there are more flood events in future. ",
            column: 'All',
            game: "Nature",
            svg: Ponds
        },
    ]

    const [game, setGame] = useState(natureGame);
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


    // retrieves result from Local Storage
    const natureText = JSON.parse(window.localStorage.getItem('result6'));

    const [natureResult, setNatureResult] = useState(natureText || "The benefits of nature are so clear! Well done, you earn the Mossy Medallion.")
    // save the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result6', JSON.stringify(natureResult));
    }, [natureResult])

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
    const gradient = "rgba(156, 199, 66, 1),rgba(255, 255, 255, 0.6)";

    
    return(
        <Switch>
            <Route path="/nature/intro">
                <Intro
                    text={game.intro}
                    skip='/outro'
                    link='/nature/game'
                    back='/retrofithomes/result'
                    gradient={gradient}
                    guy={Character}
                    background={Background}
                    guyPosition="NatureCharacter"
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
                        <h3>{game.title}</h3>
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
                <NatureResult gradient={gradient} background={Background}/>
            </Route>
        </Switch>
    )
}

export default NatureGame;