import React, { useState, useEffect } from 'react';
import Intro from '../../components/Intro';
import { Switch, Route, Link } from 'react-router-dom';
import classes from '../../styles/pages/research-development.module.scss';
import axios from 'axios';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent} from "react-collapsible-component";
import {researchDevelopmentGame, researchDevelopmentAnswers} from './Data';
import Result from '../../components/Result';

// Images and icons

import { BiArrowBack, BiRevision, BiTrophy } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import Character from '../../images/research-development/Character_8.svg';
import Background from '../../images/research-development/Game_8.svg';

const ResearchDevelopmentGame = () => {

    const game = researchDevelopmentGame;
    const items = researchDevelopmentAnswers;

    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));

    // retrieves result text from Local Storage
    const researchDevelopmentText = JSON.parse(window.localStorage.getItem('result8'));

    const [ researchDevelopmentResult, setResearchDevelopmentResult ] = useState(researchDevelopmentText || "") 

    // saves the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result8', JSON.stringify(researchDevelopmentResult));
    })
 
     const resultText = "Research and development is a fantastic way to create new jobs and solve big problems!"



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


    const displayItems = () => {

        if (!answerOne && !answerTwo && !answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>First Round - Battle 1</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>  
                            <CollapsibleComponent>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerOne(items[0])
                                        }}
                                        {...rest}

                                    >
                                    <div className={classes.Content}>
                                        <div>
                                            <h3>{items[0].name}</h3>
                                            <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                            <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[0].description}</p>  </CollapsibleContent>
                                        </div>
                                        <div>
                                            < IoIosArrowBack fontSize="5rem"/>
                                        </div>
                                    </div>
                                    </SwipeableListItem>
                                </div>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerOne(items[1])
                                        }}
                                        {...rest}
                                    
                                        >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{items[1].name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[1].description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </CollapsibleComponent>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && !answerTwo && !answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>First Round - Battle 2</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <CollapsibleComponent>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content:
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerTwo(items[2])
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{items[2].name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[2].description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerTwo(items[3])
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{items[3].name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[3].description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>

                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </CollapsibleComponent>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && !answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>  
                    <h1 className={classes.Title}>First Round - Battle 3</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <CollapsibleComponent>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerThree(items[4])
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{items[4].name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[4].description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerThree(items[5])
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{items[5].name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[5].description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </CollapsibleComponent>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && !answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>First Round - Battle 4</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <CollapsibleComponent>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerFour(items[6])
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{items[6].name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[6].description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerFour(items[7])
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{items[7].name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{items[7].description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </CollapsibleComponent>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && answerFour && !answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>Second Round - Battle 1</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <CollapsibleComponent>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerFive(answerOne)
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{answerOne.name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{answerOne.description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerFive(answerTwo)
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{answerTwo.name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{answerTwo.description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </CollapsibleComponent>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && answerFour && answerFive && !answerSix && !answerSeven) {
            return(
                <>
                    <h1 className={classes.Title}>Second Round - Battle 2</h1>
                    <SwipeableList>
                    {({ className, ...rest }) => (
                        <>
                            <CollapsibleComponent>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerSix(answerThree)
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{answerThree.name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{answerThree.description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerSix(answerFour)
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{answerFour.name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{answerFour.description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </CollapsibleComponent>
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
                            <CollapsibleComponent>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerSeven(answerFive)
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{answerFive.name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{answerFive.description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                                <div className={classes.Card}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: 
                                            <div className={classes.SwipeContent}>
                                                <BiTrophy />
                                                <span>Winner</span>
                                            </div>,
                                        action: () => setAnswerSeven(answerSix)
                                        }}
                                        {...rest}
                                        
                                    >
                                        <div className={classes.Content}>
                                            <div>
                                                <h3>{answerSix.name}</h3>
                                                <CollapsibleHead className={classes.CollapsibleHead}>Read More</CollapsibleHead>
                                                <CollapsibleContent className={classes.CollapsibleContent}> <p>{answerSix.description}</p>  </CollapsibleContent>
                                            </div>
                                            <div>
                                                < IoIosArrowBack fontSize="5rem"/>
                                            </div>
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </CollapsibleComponent>
                        </>
                    )}
                    </SwipeableList>
                </>
            )
        } else if (answerOne && answerTwo && answerThree && answerFour && answerFive && answerSix && answerSeven) {
            return(
                <div className={classes.Result}>

                    <div className={classes.ResultText}>
                        <BiTrophy className={classes.WinnerIcon}/>
                        <h3>Congrats! The winner is {answerSeven.name}</h3>
                    </div>
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
                    skip='/circular-economy/intro'
                    link='/research-development/game'
                    back='/nature/result'
                    gradient={gradient}
                    character={Character}
                    background={Background}
                    characterPosition="ResearchCharacter"
                />
            </Route>
            <Route path="/research-development/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/research-development/intro'>Back</Link>
                    </div>
                    <div className="NavLink">
                        <a onClick={startOver} >Start over</a>
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
                <Result 
                    gradient={gradient} 
                    background={Background} 
                    text={researchDevelopmentText} 
                    badge="You've earned the LAB BADGE"
                    back="/research-development/game"
                    next="/circular-economy/intro"
                />
            </Route>
        </Switch>
    )
}

export default ResearchDevelopmentGame;