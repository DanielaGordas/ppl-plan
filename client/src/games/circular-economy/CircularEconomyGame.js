import React, { useState } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import CircularEconomyResult from './CircularEconomyResult';
import classes from '../../styles/pages/circulareconomy.module.scss';
import Intro from '../../components/Intro';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';


// images and icons

import Guy from '../../images/circular-economy/Character_4.svg';
import IntroBackground from '../../images/circular-economy/Game_4_Second_screen.svg';
import { BiArrowBack, BiRevision } from "react-icons/bi";
import SkillsExchange from '../../images/circular-economy/Skills_exchange_events_icon.svg';
import FoodShares from '../../images/circular-economy/Food_shares_icon.svg';
import ClothesSwaps from '../../images/circular-economy/Clothes_swaps_icon.svg';
import FurnitureSwaps from '../../images/circular-economy/Furniture_swaps_icon.svg';
import Cleaning from '../../images/circular-economy/Cleaning_public_spaces_icon.svg';
import HouseholdWaste from '../../images/circular-economy/Household_waste_recycling_collection_icon.svg';
import LocalFood from '../../images/circular-economy/Locally_grown_food_icon.svg';
import HomeTools from '../../images/circular-economy/Home_and_garden_tools_icon.svg';
import Cars from '../../images/circular-economy/Cars_icon.svg';
import Bikes from '../../images/circular-economy/Bikes_icon.svg';
import Books from '../../images/circular-economy/Books_access_libraries_icon.svg';
import Children from '../../images/circular-economy/Childrens_pets_toys_icon.svg';
import Electronics from '../../images/circular-economy/Electronics_icon.svg';



const MovableItem = ({name, setItems, column, index, icon}) => {
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
        <div ref={drag} className={classes.Card} style={{  opacity, display: getDisplay() }}>
            <img src={icon} alt={name}/>
            <p>{name}</p>
        </div>
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
            <h4>{ title !== "All" ? children.length : null}</h4>
            <h4> {title !== "All" ? title : null}</h4>
            {children}
        </div>
        </>
    )
}



const CircularEconomyGame = () => {

    const circularEconomyGame = {
        id: 2, 
        title: "Low waste / circular society",
        intro: "In a low waste circular society, different responsibilities are shared among local people, the community, and the council. Your community centre is hosting a poll to decide who should take ownership for a variety of common issues. Select the issues and have your say. ",
        instructions: "Tap the issues to find out more. Then drag them into the box which represents who you think should look after or own that issue, service or item."
    }


    const circularEconomyAnswers = [
        {
            id: 1, 
            name: "Skills exchange events",
            description: "These events can build stronger communities and improve social equality by providing individuals with equal access to knowledge and skills, which will in turn boost local economies.",
            column: 'All',
            svg: SkillsExchange
        },
        {
            id: 2, 
            name: "Food shares",
            description: "£17 billion worth of food ends up in landfill each year in the UK - much of this could have been eaten by those in need. Food shares are set up to combat waste by sharing surplus or unwanted food with those in the community, helping to improve social and economic equality and building stronger communities.",
            column: 'All',
            svg: FoodShares
        },
        {
            id: 3, 
            name: "Clothes swaps",
            description: "Around 30% of clothing in wardrobes in the UK has not been worn for at least a year, and an estimated £140 million worth of used clothing also goes to landfill in the UK every year. Clothes swaps offer people the chance to exchange clothes, which helps build stronger communities and reduce clothing going to landfill, also saving you money!",
            column: 'All',
            svg: ClothesSwaps
        },
        {
            id: 4, 
            name: "Furniture swaps",
            description: "Furniture swaps and communal repairs/repair workshops could greatly extend the life of furniture and provide people with more sustainable options. 22 million small items of furniture are thrown away every year in the UK.",
            column: 'All',
            svg: FurnitureSwaps
        },
        {
            id: 5, 
            name: "Cleaning of parks/beaches/public spaces",
            description: "Could the local community manage this better and more effectively than the local council or a private company?",
            column: 'All',
            svg: Cleaning
        },
        {
            id: 6, 
            name: "Household waste and recycling collection",
            description: "Would you be happy for a community group to manage waste collection rather than the council?",
            column: 'All',
            svg: HouseholdWaste
        },
        {
            id: 7, 
            name: "Locally grown food",
            description: "Community allotments are an excellent way for children and young people to learn about growing food. Individual/family allotments offer great exercise and a regular supply of fruit and vegetables. A mixture of the two can benefit communities with sharing of surplus produce.",
            column: 'All',
            svg: LocalFood
        },
        {
            id: 8, 
            name: "Home and garden tools",
            description: "The average person spends almost £200 per year on tools and uses them infrequently. A shared approach could save huge amounts of resources and money.",
            column: 'All',
            svg: HomeTools
        },
        {
            id: 9, 
            name: "Cars",
            description: "Car sharing schemes help relieve local traffic congestion, saving up to £1,000 per year (on fuel costs, parking and other vehicle running costs).",
            column: 'All',
            svg: Cars
        },
        {
            id: 10, 
            name: "Bikes",
            description: "Bike sharing schemes enable users to access bikes 24/7 in urban areas, facilitating the use of cycling rather than other non-sustainable modes of transport.  A healthy, eco-friendly and fun way to travel!",
            column: 'All',
            svg: Bikes
        },
        {
            id: 11, 
            name: "Books and access to libraries",
            description: "Shared libraries/collections of books, as well as book swaps, can save the need to buy lots of books, especially textbooks that are often only used for a short while. Books can be borrowed, swapped or donated for communal use, saving paper, resources, and money.",
            column: 'All',
            svg: Books
        },
        {
            id: 12, 
            name: "Childrens’ or pets’ toys",
            description: "Every year in the UK, 8.5 million nearly new toys are thrown out as children and pets grow out of, or lose interest in, them. These can be redistributed to other children or pets as needed, reducing the amount in landfill.",
            column: 'All',
            svg: Children
        },
        {
            id: 13, 
            name: "Electronics",
            description: "The UK could save £370 million if all the old small electricals that are either thrown away or hoarded were recycled.",
            column: 'All',
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
            <MovableItem key={item.id} name={item.name} column={item.column} setItems={setItems} index={index} icon={item.svg}/>
        ))
    }

    const startOver = () => {
        setItems(circularEconomyAnswers)
    }

    // gradient for the background
    const gradient = "rgba(252, 149, 55, 1),rgba(255, 255, 255, 0.7)";

    
    return(
        <Switch>
            <Route path="/circulareconomy/intro">
                <Intro text={game.intro} link='/circulareconomy/game' back='/lowcarbon/result' background={IntroBackground} guy={Guy} gradient={gradient}/>
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
                            <Column title='All' className={classes.FirstColumn}>
                                {returnItemsForColumn('All')}
                            </Column>
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
                            <button className="Btn">Complete!</button>
                        </DndProvider>
                    </div>
                </div>
            </Route>
            <Route path="/circulareconomy/result">
                <CircularEconomyResult />
            </Route>
        </Switch>
    )
}

export default CircularEconomyGame;