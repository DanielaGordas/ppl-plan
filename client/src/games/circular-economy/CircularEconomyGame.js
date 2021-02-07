import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import CircularEconomyResult from './CircularEconomyResult';
import classes from '../../styles/pages/circular-economy.module.scss';
import Intro from '../../components/Intro';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import Modal from '../../components/Modal';
import axios from 'axios';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';


// Images and icons

import Guy from '../../images/circular-economy/Character_Game_4.svg';
import IntroBackground from '../../images/circular-economy/Game_4_First_Screen.svg';
import { BiArrowBack, BiRevision } from "react-icons/bi";
import FoodShares from '../../images/circular-economy/Food_shares_blue_icon.svg';
import ClothesSwaps from '../../images/circular-economy/Clothes_swaps_blue_icon.svg';
import FurnitureSwaps from '../../images/circular-economy/Furniture_swaps_blue_icon.svg';
import LocalFood from '../../images/circular-economy/Locally_grown_food_blue_icon.svg';
import HomeTools from '../../images/circular-economy/Home_and_garden_tools_blue_icon.svg';
import Cars from '../../images/circular-economy/Cars_blue_icon.svg';
import Bikes from '../../images/circular-economy/Bikes_blue_icon.svg';
import Children from '../../images/circular-economy/Childrens_pets_toys_blue_icon.svg';
import Electronics from '../../images/circular-economy/Electronics_blue_icon.svg';



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

    const circularEconomyGame = {
        id: 4, 
        title: "Low waste / circular society",
        intro: "Cutting waste and creating resilient communities is more important than ever. Our local community is voting on some ideas to implement. Do you think they should happen now, in the future or never?",
        instructions: "Tap the proposals to find out more. Then drag them into the box to vote when/if you think we should implement them."
    }

    const circularEconomyAnswers = [
        {
            id: 1, 
            name: "Food sharing",
            description: "£17 billion worth of food ends up in landfill each year in the UK - much of this could have been eaten by those in need. Individuals currently are responsible for this. Food sharing events combat waste by sharing surplus or unwanted food with those in the community, helping to improve social and economic equality and building stronger communities.",
            column: 'All',
            game: "Circular Economy",
            svg: FoodShares
        },
        {
            id: 2, 
            name: "Clothes swaps",
            description: "Around 30% of clothing in wardrobes in the UK has not been worn for at least a year, and an estimated £140 million worth of used clothing also goes to landfill in the UK every year. Clothes swaps offer people the chance to exchange clothes, which helps build stronger communities and reduce clothing going to landfill, also saving you money!",
            column: 'All',
            game: "Circular Economy",
            svg: ClothesSwaps
        },
        {
            id: 3, 
            name: "Furniture swaps",
            description: "Furniture swaps and communal repairs/repair workshops could greatly extend the life of furniture and provide people with more sustainable options. 22 million small items of furniture are thrown away every year in the UK.",
            column: 'All',
            game: "Circular Economy",
            svg: FurnitureSwaps
        },
        {
            id: 4, 
            name: "Locally grown food",
            description: "Community allotments are an excellent way for children and young people to learn about growing food. Individual/family allotments offer great exercise and a regular supply of fruit and vegetables. You can use household food waste to compost too!",
            column: 'All',
            game: "Circular Economy",
            svg: LocalFood
        },
        {
            id: 5, 
            name: "Home and garden tools",
            description: "The average person spends almost £200 per year on tools and uses them infrequently. A shared approach could save huge amounts of resources and money. Maybe it operates like the library?",
            column: 'All',
            game: "Circular Economy",
            svg: HomeTools
        },
        {
            id: 6, 
            name: "Cars",
            description: "Car sharing schemes help relieve local traffic congestion, saving up to £1,000 per year (on fuel costs, parking and other vehicle running costs).",
            column: 'All',
            game: "Circular Economy",
            svg: Cars
        },
        {
            id: 7, 
            name: "Bikes",
            description: "Bike sharing schemes enable users to access bikes 24/7 in urban areas, facilitating the use of cycling rather than other non-sustainable modes of transport.  A healthy, eco-friendly and fun way to travel!",
            column: 'All',
            game: "Circular Economy",
            svg: Bikes
        },
        {
            id: 8, 
            name: "Childrens’ or pets’ toys",
            description: "Every year in the UK, 8.5 million nearly new toys are thrown out as children and pets grow out of, or lose interest in, them. These can be redistributed to other children or pets as needed, reducing the amount in landfill.",
            column: 'All',
            game: "Circular Economy",
            svg: Children
        },
        {
            id: 9, 
            name: "Electronics",
            description: "The UK could save £370 million if all the old small electricals that are either thrown away or hoarded were recycled.",
            column: 'All',
            game: "Circular Economy",
            svg: Electronics
        },  
    ]

    const [game, setGame] = useState(circularEconomyGame);
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
        let result = ""
        if(now.length > future.length && now.length > never.length) {
            result = "now"
        } else if (future.length > now.length && future.length > never.length) {
            result = "future";
        } else if (never.length > now.length && never.length > future.length) {
            result = "never"
        } else {
            result = "equal"
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
            window.location = '/circulareconomy/result'
        } else {
            window.location = '/circulareconomy/game'
        }
    }

    const startOver = () => {
        setItems(circularEconomyAnswers)
    }

    // gradient for the background
    const gradient = "rgba(252, 149, 55, 1),rgba(255, 255, 255, 0.7)";

    
    return(
        <Switch>
            <Route path="/circulareconomy/intro">
                <Intro
                    text={game.intro}
                    skip='/retrofithomes/intro'
                    link='/circulareconomy/game'
                    back='/lowcarbon/result'
                    background={IntroBackground}
                    guy={Guy}
                    guyPosition="CircularCharacter"
                    gradient={gradient}
                />
            </Route>
            <Route path="/circulareconomy/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/circulareconomy/intro'>Back</Link>
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
            <Route path="/circulareconomy/result">
                <CircularEconomyResult gradient={gradient}/>
            </Route>
        </Switch>
    )
}

export default CircularEconomyGame;