import React, { useState, useEffect } from 'react';
import Intro from '../../components/Intro';
import { Switch, Route, Link } from 'react-router-dom';
import ResearchDevelopmentResult from './ResearchDevelopmentResult';
import classes from '../../styles/pages/research-development.module.scss';
import axios from 'axios';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

// Images and icons

import { BiArrowBack, BiRevision } from "react-icons/bi";
import Character from '../../images/nature/Character 6.svg';
import Background from '../../images/nature/Game_6_First_Screen.svg';

const ResearchDevelopmentGame = () => {

    const researchDevelopmentGame = {
        id: 8, 
        title: "Research and Development",
        intro: "The most famous climate lab in the world has been given some funding for an amazing new R&D project. All the scientists in the lab are competing for this money. The R&D projects are going head to head, and you decide which project wins!",
        instructions: "Play each battle and decide the winner by swipping left. You will play 2 rounds leading to the grand final and an overall winner."
    }

    const researchDevelopmentAnswers = [
        {
            id: 1, 
            name: "New Nuclear Power",
            description: "Create a new generation of reactors, with improved safety and lower costs. They are called Small Modular Reactors (SMRs). They use advanced tech to be smaller and more flexible. They could help create zero carbon energy, and even help create synthetic aviation fuels. If done right, this industry could create tens of thousands of new jobs as part of the energy transition.",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
        {
            id: 2, 
            name: "Win With Waste",
            description: "About 25% of the UKs waste was disposed of at landfill in 2016 which still carries huge emissions both in CO2 and pollution. We could create better ways to reuse and transform waste into energy. Research in this area could create lots of green jobs and create all kinds of new biofuels and processes.",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
        {
            id: 3, 
            name: "Excellent Energy Storage",
            description: "Many renewable energies generate an inconsistent flow of electricity, sometimes producing none at all and other times producing an excess which gets wasted. Doing more research into the various chemical and other types of batteries will improve energy storage, reduce reliance on fossil fuels, save consumers money and make the electricity system more reliable and resilient",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
        {
            id: 4, 
            name: "Super Sustainable Agriculture",
            description: "Agriculture uses 70% of UK land, so research into regenerative agricultural methods which treat farms as individual ecosystems that can be redesigned to work in sync with nature is crucial to improving soil health and sucking down carbon. Further benefits range from preventing flooding to strengthening the food supply chain.",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
        {
            id: 5, 
            name: "Ocean Energy, Making Waves",
            description: "Ocean energy generates electricity from waves, tides, currents, temperature differences or even salinity (salt) concentration differences in the ocean. With long coastlines and large tidal ranges, the UK is a good candidate for ocean technology. Wave and tidal stream energy has potential to meet up to 20% of our electricity demand and there are already a number of ongoing small scale projects using these technologies.",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
        {
            id: 6, 
            name: "Critical Carbon Capture (Use & Storage)",
            description: "Capturing carbon dioxide, either from industrial waste gases or direct from the air, could be groundbreaking for combatting emissions. Carbon capture is a particularly useful technology to help lower emissions from ‘hard to reach’ areas, such as heavy industry, or in developing countries whose economies may rely on fossil fuels to power development for decades to come.",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
        {
            id: 7, 
            name: "Create Smart Cities",
            description: "Cities are responsible for 75% of the world’s energy demand, research into smart tech could accelerate the shift toward a cleaner and less polluted urban space. Smart tech includes AI and data gathered from sensors, cameras, solar panels, apps, smart-meters, and even bins. The potential benefits are enormous.",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
        {
            id: 8, 
            name: "Better Biofuel",
            description: "Biofuels, although not the cleanest option, have potential to replace fossil fuels until longer term solutions are put in place. It does not require expensive adjustments or infrastructure to aid the transition and has already made great leaps in development. For example, through research we have already developed advanced biofuels, and can now produce biohydrogen which fuels vehicles with zero emissions.",
            column: 'All',
            game: "Research and Development",
            svg: "",
            selected: false
        },
    ]

    const [game, setGame] = useState(researchDevelopmentGame);
    const [items, setItems] = useState(researchDevelopmentAnswers);

    // decides if device is mobile or desktop for touch/click events
    const isMobile = window.innerWidth < 600;

    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));

    // retrieves result text from Local Storage
    const researchDevelopmentText = JSON.parse(window.localStorage.getItem('result8'));

    const [ researchDevelopmentResult, setResearchDevelopmentResult ] = useState(researchDevelopmentText || "") 

    // saves the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result8', JSON.stringify(researchDevelopmentResult));
    })
 
     const resultText = "Research and development is a fantastic way to create new jobs and solve big problems! For helping pick the winning project you earn the Lab Badge!"



    const startOver = () => {
        setAnswerOne();
        setAnswerTwo();
        setAnswerThree();
        setAnswerFour();
        setAnswerFive();
        setAnswerSix();
        setAnswerSeven();
    }

    const [answerOne, setAnswerOne] = useState()
    const [answerTwo, setAnswerTwo] = useState()
    const [answerThree, setAnswerThree] = useState()
    const [answerFour, setAnswerFour] = useState()
    const [answerFive, setAnswerFive] = useState()
    const [answerSix, setAnswerSix] = useState()
    const [answerSeven, setAnswerSeven] = useState()


        // saves guest_answers to the DB     
        const submitAnswers = () => {

            const qs = require('qs');
            
            if(answerSeven && guestDetails) {
                axios.post('/api/answers', qs.stringify(
                    {
                        answer: {
                            guest_id: guestDetails.id,
                            name: answerSeven.name,
                            description: answerSeven.description,
                            column: answerSeven.column,
                            category: answerSeven.category,
                            game: answerSeven.game
                    }
                }))
                .then(res => {
                    setResearchDevelopmentResult(resultText)
                    handleRedirect(res)
                })
                    .catch(err => console.log(err))
            }
        }
            
        const handleRedirect = (res) => {
            if(res.status === 201 || res.status === 200) {
                window.location = '/research-development/result'
            } else {
                window.location = '/research-development/game'
            }
        }


    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);  
    const closeModal = () => setShow(false);

    const displayItems = () => {

        if (!answerOne && !answerTwo && !answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>First Round</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerOne(items[0])
                                    }}
                                    {...rest}

                                >
                                <div>
                                    <h3>{items[0].name}</h3>
                                    <p>{items[0].description}</p>
                                </div>
                                </SwipeableListItem>
                            </div>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerOne(items[1])
                                    }}
                                    {...rest}
                                
                                    >
                                    <div>
                                        <h3>{items[1].name}</h3>
                                        <p>{items[1].description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && !answerTwo && !answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>First Round</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerTwo(items[2])
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{items[2].name}</h3>
                                        <p>{items[2].description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerTwo(items[3])
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{items[3].name}</h3>
                                        <p>{items[3].description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && !answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>  
                    <h1 className={classes.Title}>First Round</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerThree(items[4])
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{items[4].name}</h3>
                                        <p>{items[4].description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerThree(items[5])
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{items[5].name}</h3>
                                        <p>{items[5].description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>First Round</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerFour(items[6])
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{items[6].name}</h3>
                                        <p>{items[6].description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerFour(items[7])
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{items[7].name}</h3>
                                        <p>{items[7].description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>Second Round</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerFive(answerOne)
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{answerOne.name}</h3>
                                        <p>{answerOne.description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerFive(answerTwo)
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{answerTwo.name}</h3>
                                        <p>{answerTwo.description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && answerFour && answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>Second Round</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerSix(answerThree)
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{answerThree.name}</h3>
                                        <p>{answerThree.description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerSix(answerFour)
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{answerFour.name}</h3>
                                        <p>{answerFour.description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && answerFour && answerFive && answerSix && !answerSeven) {
            return(
                <>
                <h1 className={classes.Title}>Final Round</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerSeven(answerFive)
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{answerFive.name}</h3>
                                        <p>{answerFive.description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                            <div className={classes.Card}>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <div>Winner</div>,
                                    action: () => setAnswerSeven(answerSix)
                                    }}
                                    {...rest}
                                    
                                >
                                    <div>
                                        <h3>{answerSix.name}</h3>
                                        <p>{answerSix.description}</p>
                                    </div>
                                </SwipeableListItem>
                            </div>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && answerFour && answerFive && answerSix && answerSeven) {
            return(
                <div className={classes.Result}>
                    <div className={classes.ResultText}>Congrats! The winner is {answerSeven.name}</div>
                    <button className="Btn-border" onClick={submitAnswers}>Complete!</button>
                </div>
            )
        }
    }


    // gradient for the background
    const gradient = "rgba(156, 199, 66, 1),rgba(255, 255, 255, 0.6)";


    return(
        <Switch>
            <Route path="/research-development/intro">
                <Intro
                    text={game.intro}
                    skip='/outro'
                    link='/research-development/game'
                    back='/sustainable-food-system/result'
                    gradient={gradient}
                    guy={Character}
                    background={Background}
                    guyPosition="NatureCharacter"
                />
            </Route>
            <Route path="/research-development/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/research-development/intro'>Back</Link>
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
                    {displayItems()}
                </div>
            </Route>
            <Route path="/research-development/result">
                <ResearchDevelopmentResult gradient={gradient} background={Background}/>
            </Route>
        </Switch>
    )
}

export default ResearchDevelopmentGame;