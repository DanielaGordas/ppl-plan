import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import CircularEconomyResult from './CircularEconomyResult';
import classes from '../../styles/pages/circulareconomy.module.scss';
import Intro from '../../components/Intro';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import Modal from '../../components/Modal';
import axios from 'axios';


// images and icons

import Guy from '../../images/circular-economy/Character_4.svg';
import IntroBackground from '../../images/circular-economy/Game_4_First_Screen.svg';
import { BiArrowBack, BiRevision } from "react-icons/bi";
import SkillsExchange from '../../images/circular-economy/Skills_exchange_events_blue_icon.svg';
import FoodShares from '../../images/circular-economy/Food_shares_blue_icon.svg';
import ClothesSwaps from '../../images/circular-economy/Clothes_swaps_blue_icon.svg';
import FurnitureSwaps from '../../images/circular-economy/Furniture_swaps_blue_icon.svg';
import Cleaning from '../../images/circular-economy/Cleaning_public_spaces_blue_icon.svg';
import HouseholdWaste from '../../images/circular-economy/Household_waste_recycling_collection_blue_icon.svg';
import LocalFood from '../../images/circular-economy/Locally_grown_food_blue_icon.svg';
import HomeTools from '../../images/circular-economy/Home_and_garden_tools_blue_icon.svg';
import Cars from '../../images/circular-economy/Cars_blue_icon.svg';
import Bikes from '../../images/circular-economy/Bikes_blue_icon.svg';
import Books from '../../images/circular-economy/Books_access_libraries_blue_icon.svg';
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
        item: { name, type:'Our first type'},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'All'){
                changeItemColumn(item, 'All')
            } else if (dropResult && dropResult.name === 'Individuals'){
                changeItemColumn(item, 'Individuals')
            } else if (dropResult && dropResult.name === 'Community') {
                changeItemColumn(item, 'Community')
            } else {
                changeItemColumn(item, 'Council')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    const getDisplay = () => {
        if(column === "All" && index === 0) {
            return 'flex'
        } else {
            return 'none'
        }
    }

    return (
        <>
            <div ref={drag} className={classes.Card} style={{  opacity, display: getDisplay() }} onClick={openModal}>
                <img src={icon} alt={name}/>
                <p>{name}</p>
            </div>
            { show? <Modal title={name} description={description} show={show} closeModal={closeModal} icon={icon}/> : null }
        </>
    )
}



const Column = ({children, className, title}) => {

    const [, drop] = useDrop({
        accept: 'Our first type',
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
        id: 2, 
        title: "Low waste / circular society",
        intro: "In a low waste circular society, different responsibilities are shared among local people, the community, and the council. Your community centre is hosting a poll to decide who should take ownership for a variety of common issues.",
        instructions: "Tap the issues to find out more. Drag the policies into the ballot which represents who you think should look after or own that issue."
    }


    const circularEconomyAnswers = [
        {
            id: 1, 
            name: "Skills exchange events",
            description: "These events can build stronger communities and improve social equality by providing individuals with equal access to knowledge and skills, which will in turn boost local economies.",
            column: 'All',
            game: "Circular Economy",
            svg: SkillsExchange
        },
        {
            id: 2, 
            name: "Food shares",
            description: "£17 billion worth of food ends up in landfill each year in the UK - much of this could have been eaten by those in need. Food shares are set up to combat waste by sharing surplus or unwanted food with those in the community.",
            column: 'All',
            game: "Circular Economy",
            svg: FoodShares
        },
        {
            id: 3, 
            name: "Clothes swaps",
            description: "Around 30% of clothing in wardrobes in the UK has not been worn for at least a year, and an estimated £140 million worth of used clothing also goes to landfill in the UK every year.",
            column: 'All',
            game: "Circular Economy",
            svg: ClothesSwaps
        },
        {
            id: 4, 
            name: "Furniture swaps",
            description: "Furniture swaps and communal repairs/repair workshops could greatly extend the life of furniture and provide people with more sustainable options. 22 million small items of furniture are thrown away every year in the UK.",
            column: 'All',
            game: "Circular Economy",
            svg: FurnitureSwaps
        },
        {
            id: 5, 
            name: "Cleaning of parks/beaches/public spaces",
            description: "Could the local community manage this better and more effectively than the local council or a private company?",
            column: 'All',
            game: "Circular Economy",
            svg: Cleaning
        },
        {
            id: 6, 
            name: "Household waste and recycling collection",
            description: "Would you be happy for a community group to manage waste collection rather than the council?",
            column: 'All',
            game: "Circular Economy",
            svg: HouseholdWaste
        },
        {
            id: 7, 
            name: "Locally grown food",
            description: "Community allotments are an excellent way for children and young people to learn about growing food. Individual/family allotments offer great exercise and a regular supply of fruit and vegetables.",
            column: 'All',
            game: "Circular Economy",
            svg: LocalFood
        },
        {
            id: 8, 
            name: "Home and garden tools",
            description: "The average person spends almost £200 per year on tools and uses them infrequently. A shared approach could save huge amounts of resources and money.",
            column: 'All',
            game: "Circular Economy",
            svg: HomeTools
        },
        {
            id: 9, 
            name: "Cars",
            description: "Car sharing schemes help relieve local traffic congestion, saving up to £1,000 per year (on fuel costs, parking and other vehicle running costs).",
            column: 'All',
            game: "Circular Economy",
            svg: Cars
        },
        {
            id: 10, 
            name: "Bikes",
            description: "Bike sharing schemes enable users to access bikes 24/7 in urban areas, facilitating the use of cycling rather than other non-sustainable modes of transport.  A healthy, eco-friendly and fun way to travel!",
            column: 'All',
            game: "Circular Economy",
            svg: Bikes
        },
        {
            id: 11, 
            name: "Books and access to libraries",
            description: "Shared libraries/collections of books, as well as book swaps, can save the need to buy lots of books, especially textbooks that are often only used for a short while. Books can be borrowed, swapped or donated for communal use, saving paper, resources, and money.",
            column: 'All',
            game: "Circular Economy",
            svg: Books
        },
        {
            id: 12, 
            name: "Childrens’ or pets’ toys",
            description: "Every year in the UK, 8.5 million nearly new toys are thrown out as children and pets grow out of, or lose interest in, them. These can be redistributed to other children or pets as needed, reducing the amount in landfill.",
            column: 'All',
            game: "Circular Economy",
            svg: Children
        },
        {
            id: 13, 
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


    const individualOwnership = [];
    const communityOwnership = [];
    const councilOwnership = [];


    items.map(item => {
        if (item.column === 'Individuals') {
            individualOwnership.push(item);
        } else if (item.column === "Community"){
            communityOwnership.push(item);
        } else if (item.column === "Council"){
            councilOwnership.push(item);
        }
        return item;
    })

    // decides the result of the game 
    const result = () => {
        let result = ""
        if(individualOwnership.length > communityOwnership.length && individualOwnership.length > councilOwnership.length) {
            result = "individual ownership"
        } else if (communityOwnership.length > individualOwnership.length && communityOwnership.length > councilOwnership.length) {
            result = "community ownership";
        } else if (councilOwnership.length > individualOwnership.length && councilOwnership.length > communityOwnership.length) {
            result = "council ownership";
        }

        return result;
    }

    // retrieves result from Local Storage
    const circularEconomyText = JSON.parse(window.localStorage.getItem('result4'));

    const [circularEconomyResult, setCircularEconomyResult] = useState(circularEconomyText || "")
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
                        <h3>{game.title}</h3>
                        <p>{game.instructions}</p>
                    </div>   
                    <div className={classes.Container}>            
                        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>               
                            {
                                (finalItems.length === 13) ? 
                                <button className="Btn" style={{margin: '4rem 0'}} onClick={submitAnswers}>Complete!</button> 
                                :                  
                                <Column title='All' className={classes.FirstColumn}>
                                    {returnItemsForColumn('All')}
                                </Column> 
                            }
                            <div className={classes.Choices}>
                                <Column title='Individuals' className={classes.SecondColumn}>
                                    {returnItemsForColumn('Individuals')}
                                </Column>
                                <Column title='Community' className={classes.SecondColumn}>
                                    {returnItemsForColumn('Community')}
                                </Column>
                                <Column title='Council' className={classes.SecondColumn}>
                                    {returnItemsForColumn('Council')}
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