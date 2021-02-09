import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import SustainableFoodResult from './SustainableFoodResult';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import classes from '../../styles/pages/low-carbon.module.scss';
import Intro from '../../components/Intro';
import axios from 'axios';
import Modal from '../../components/Modal';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';

// Icons and Images
import CarScrappageScheme from '../../images/low-carbon/Car_scrappage_scheme.svg';
import { FaAngleDown} from 'react-icons/fa';
import { BiArrowBack, BiRevision } from "react-icons/bi";
import IntroBackground from '../../images/low-carbon/Game_1_screen_1.svg';
import Guy from '../../images/low-carbon/Character_1_First_screen.svg';


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

    const sustainableFoodGame = {
        id: 2, 
        title: "Sustainable Food System",
        intro: "Gill is setting up a new supermarket, ‘Planet Food’, and wants it to be the most sustainable place to shop in town. She wants to educate shoppers and other businesses on plant based diets, local food and reducing food waste. What ideas should Gill promote?",
        instructions: "Choose 2 ideas from each category to help Gill set up her educational campaign."
    }


    const sustainableFoodAnswers = [
        {
            id: 1, 
            name: "Total ban on edible food waste",
            description: "Throwing away edible food should be banned, and supermarkets must donate food nearing its best-before date to food banks and charities.",
            column: 'food waste',
            category: 'food waste',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 2, 
            name: "Promote eating ‘ugly’ fruits and vegetables",
            description: "Selling ‘ugly’ produce at reduced rates will reduce edible food waste. This could also provide a cheaper option to those on lower incomes and allow farmers to increase their profits.",
            column: 'food waste',
            category: 'food waste',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 3, 
            name: "Community composting",
            description: "Community composting will reduce the food waste going to landfill and could provide good quality compost to community allotments and local farmers.",
            column: 'food waste',
            category: 'food waste',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 4, 
            name: "Household food waste collection",
            description: "Guarantee food waste collections for all UK households. Provide education this will increase awareness of how much food goes in the bin and encourage people to waste less.",
            column: 'food waste',
            category: 'food waste',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 5, 
            name: "Better food labels",
            description: "Simplify food labels by using just one label (instead of 2 or 3) to show the expiration date, maintaining food safety and ending confusion and excess food waste.",
            column: 'food waste',
            category: 'food waste',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 6, 
            name: "Environmental food labels",
            description: "Food producers and manufacturers must label products to show their environmental impact, particularly greenhouse gas emissions, enabling customers to make more informed decisions",
            column: 'animal agriculture & diet',
            category: 'animal agriculture & diet',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 7, 
            name: "Education on plant-based diets",
            description: "Increase awareness of the carbon intensity of meat and dairy, whilst educating people on how to eat a healthy balanced plant-based diet, including added health and financial benefits.",
            column: 'animal agriculture & diet',
            category: 'animal agriculture & diet',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 8, 
            name: "Petition schools and hospitals to offer more plant-based options",
            description: "Support the introduction of plant-based options in government funded institutions, which account for 30% of all meals eaten in the UK.",
            column: 'animal agriculture & diet',
            category: 'animal agriculture & diet',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 9, 
            name: "Promote sustainable farming",
            description: "Help farmers become more sustainable by moving away from intensive farming, which is responsible for biodiversity loss, greenhouse gas emissions, air and water pollution, and degraded soils. Offer grants and redirect existing subsidies towards more sustainable farming methods.",
            column: 'animal agriculture & diet',
            category: 'animal agriculture & diet',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 10, 
            name: "Take part in plant-based research and development",
            description: "Plant-based meat alternatives need more research and development to help achieve an industry with 90% fewer greenhouse gas emissions than beef. They use less land, do not require antibiotics, and will help people eat more sustainably.",
            column: 'animal agriculture & diet',
            category: 'animal agriculture & diet',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 11, 
            name: "Prioritising local suppliers",
            description: "Contracting local suppliers will increase food security across villages, towns and cities whilst boosting the economy and jobs in these areas.",
            column: 'localised food system',
            category: 'localised food system',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 12, 
            name: "Promote eating seasonally",
            description: "Eating seasonal foods can simplify complex supply chains and reduce the carbon footprint of our food by up to 10%. Foods that are grown locally and can be consumed sooner have a higher nutritional content than food that has travelled for longer to reach supermarkets.",
            column: 'localised food system',
            category: 'localised food system',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 13, 
            name: "Invest in community growing projects",
            description: "Invest in local projects which promote learning and give people the opportunity to produce their own food. This could include exchanging land for labour or labour for produce, for example volunteers helping local farmers to plant and harvest in exchange for fresh fruit and vegetables.",
            column: 'localised food system',
            category: 'localised food system',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 14, 
            name: "Introduce educational programmes on growing food sustainably",
            description: "For example, school vegetable gardens can help show children the connections between humans, food and the environment. This is proven to improve academic achievement, promote healthy lifestyles, as well as encouraging community and social development.",
            column: 'localised food system',
            category: 'localised food system',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        },
        {
            id: 15, 
            name: "Repurpose farmland",
            description: " 70% of the UK is farmland - if we free up more land by moving away from emission-heavy animal farming and towards horticulture farming, we can use it instead for large-scale rewilding. We could see economic and health benefits by significantly increasing our domestic supply of fruits, vegetables, nuts and pulses, as well as creating natural carbon stores from rewilding.",
            column: 'localised food system',
            category: 'localised food system',
            game: "Sustainable Food System",
            svg: CarScrappageScheme
        }
      
    ]

    const [game, setGame] = useState(sustainableFoodGame);
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
 
     const resultText = "Thank you for helping Gill! The UK throws away £17 billion of food every year..Going plant based could prevent 45,000 excess deaths each year.. Local food vs food transported by plane carries 100 times less emissions..."

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
                <Column title='food waste' className={classes.Box}>
                    {returnItemsForColumn('food waste')}
                </Column>
            )
        } else if (finalItems.length >= 2 && finalItems.length < 4) {
            return (
                <Column title='animal agriculture & diet' className={classes.Box}>
                    {returnItemsForColumn('animal agriculture & diet')}
                </Column>
            )
        } else if (finalItems.length >= 4) {
            return (
                <Column title='localised food system' className={classes.Box}>
                    {returnItemsForColumn('localised food system')}
                </Column>
            )
        }
    }

    const gradient = "rgba(169, 219, 232, 1),rgba(255, 255, 255, 0.6)";

    return(
        <Switch>
            <Route path="/sustainable-food-system/intro">
                <Intro
                    text={game.intro}
                    link='/sustainable-food-system/game'
                    back='/user'
                    skip='/circulareconomy/intro'
                    background={IntroBackground}
                    guy={Guy}
                    guyPosition="LowcarbonCharacter"
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
                            <Column title='5' className={classes.Selected}>
                                {returnItemsForColumn('6')}
                            </Column>
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </Route>
            <Route path="/sustainable-food-system/result">
                <SustainableFoodResult />
            </Route>
        </Switch>
    )
}

export default SustainableFoodGame;