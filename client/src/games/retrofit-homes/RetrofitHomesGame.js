import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { Switch, Route, Link } from 'react-router-dom';
import classes from '../../styles/pages/low-carbon.module.scss'
import Intro from '../../components/Intro';
import styles from '../../styles/pages/retrofit.module.scss';
import axios from 'axios';
import Modal from '../../components/Modal';
import itemTypes from '../../components/ItemTypes';
import MyPreview from '../../components/MyPreview';
import { retrofitHomesGame, retrofitHomesAnswers } from './Data';
import Result from '../../components/Result';

// images and icons

import {FaAngleDown} from 'react-icons/fa';
import { BiArrowBack, BiRevision } from "react-icons/bi";
import Character from '../../images/retrofit-homes/Character 3a.svg';
import Background from '../../images/retrofit-homes/Game_3_new_screen.svg';

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
            } else if (dropResult && dropResult.name === '1'){
                changeItemColumn(item, '1')
            } else if (dropResult && dropResult.name === '2') {
                changeItemColumn(item, '2')
            } else if (dropResult && dropResult.name === '3') {
              changeItemColumn(item, '3')
            } else if (dropResult && dropResult.name === '4') {
              changeItemColumn(item, '4')
            } else if (dropResult && dropResult.name === '5') {
              changeItemColumn(item, '5')
            } else if (dropResult && dropResult.name === '6') {
              changeItemColumn(item, '6')
            } else if (dropResult && dropResult.name === '7') {
              changeItemColumn(item, '7')
            } else if (dropResult && dropResult.name === '8') {
              changeItemColumn(item, '8')
            } else if (dropResult && dropResult.name === '9') {
              changeItemColumn(item, '9')
            } 
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const getDisplay = () => {
      if((column === "All" && index === 0) || column === "1" || column === "2" || column === "3" || column === "4" || column === "5" || column === "6" || column === "7" || column === "8" || column === "9" ) {
          return 'flex';
      } else {
        return 'none';
      }
    }

    const getClass = () => {
      if(column === "1" || column === "2" || column === "3" || column === "4" || column === "5" || column === "6" || column === "7" || column === "8" || column === "9") {
        return `${styles.Card} ${styles.Translate}`
      } else {
        return `${styles.Card}`
      }
    }

    useEffect(()=> {
        if(column === "All" && index === 0 ) {
            setInfo([name, icon, description]);
        }
    }, [index])


    return (
      <div ref={drag} className={getClass()} style={{  display: getDisplay() }}>
          <img src={icon} alt={name} className={styles.Icon}  />
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
          return children.length === 0 || title === "All";
        }
    })


    return (
        <>
        <div ref={drop} className={className}>
             {title !== "All"  &&
                <h4>{title}</h4> 
             }
            {children}
        </div>
        </>
    )
}

const Info = ({info, finalItems, submitAnswers}) => {
    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);  
    const closeModal = () => setShow(false);

    

    if (finalItems.length === 9)
        return <button className="Btn-border" onClick={submitAnswers} style={{marginTop: "2rem"}}>Complete!</button>
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

const RetrofitHomesGame = () => {

    const game = retrofitHomesGame;
    const [items, setItems] = useState(retrofitHomesAnswers);
    const [info, setInfo] = useState([retrofitHomesAnswers[0].name,retrofitHomesAnswers[0].icon, retrofitHomesAnswers[0].description])

    const isMobile = window.innerWidth < 600;

    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item) => item.column === columnName)
        .map((item, index) => (
            <MovableItem key={item.id} setInfo={setInfo} name={item.name} icon={item.icon} column={item.column} setItems={setItems} index={index} description={item.description}/>
        ))
    }

    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));
    
    // filters answers that are in the 5 selected columns
    const finalItems = items.filter((item) => item.column !== "All")

     // retrieves result from Local Storage
     const retrofitHomesText = JSON.parse(window.localStorage.getItem('result3'));


    const resultText = "It’s estimated the UK has 28 million homes badly in need of energy efficiency improvements!  Thanks for helping prioritise the changes we should make first."

    const [retrofitHomesResult, setRetrofitHomesResult] = useState(retrofitHomesText || "")

    // save the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result3', JSON.stringify(retrofitHomesResult));
    })

    // Logic for persisting the answers in the DB: 

    // saves guest_answers to the DB     
    const submitAnswers = () => {

        const qs = require('qs');
        
        if(finalItems.length === 9 && guestDetails) {
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
                    setRetrofitHomesResult(resultText)
                    handleRedirect(res)
                })
                    .catch(err => console.log(err))
                })
        }
    }

    const handleRedirect = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/retrofit-homes/result'
        } else {
            window.location = '/retrofit-homes/game'
        }
    }


    const gradient = "rgba(169, 219, 232, 1),rgba(255, 255, 255, 0.6)";

    const startOver = () => {
        setItems(retrofitHomesAnswers)
    }

    return(
        <Switch>
            <Route path="/retrofit-homes/intro">
                <Intro 
                    text={game.intro}
                    link='/retrofit-homes/game'
                    game='/retrofit-homes'
                    back="/circular-economy/result"
                    skip="/sustainable-food-system/intro"
                    background={Background}
                    character={Character}
                    characterPosition="RetrofitCharacter"
                    gradient={gradient} />
            </Route>
            <Route path="/retrofit-homes/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/retrofit-homes/intro'>Back</Link>
                    </div>
                    <div className="NavLink">
                        <a className="" onClick={startOver} >Start over  </a>
                        < BiRevision className="RightIcon"/>
                    </div>
                </div>
                <div className={styles.Background}>
                <div className={classes.Instructions}>
                  <p>{game.instructions}</p>
                </div>   
                <div className="Container">            
                    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>
                    {isMobile ?  <MyPreview classes={classes} /> : null }
                        <div className={styles.Choices}>
                          <Column title='1' className={styles.SecondColumn}>
                              {returnItemsForColumn('1')}
                          </Column>
                          <Column title='2' className={styles.SecondColumn}>
                              {returnItemsForColumn('2')}
                          </Column>
                          <Column title='3' className={styles.SecondColumn}>
                              {returnItemsForColumn('3')}
                          </Column>
                          <Column title='4' className={styles.SecondColumn}>
                              {returnItemsForColumn('4')}
                          </Column>
                          <Column title='5' className={styles.SecondColumn}>
                              {returnItemsForColumn('5')}
                          </Column>
                          <Column title='6' className={styles.SecondColumn}>
                              {returnItemsForColumn('6')}
                          </Column>
                          <Column title='7' className={styles.SecondColumn}>
                              {returnItemsForColumn('7')}
                          </Column>
                          <Column title='8' className={styles.SecondColumn}>
                              {returnItemsForColumn('8')}
                          </Column>
                          <Column title='9' className={styles.SecondColumn}>
                              {returnItemsForColumn('9')}
                          </Column>
                        <Column title='All' className={`${styles.Column} ${styles.FirstColumn}`}>
                            {returnItemsForColumn('All')}
                        </Column>
                        </div>
                        <div className={styles.Flex}>
                            <Info info={info} finalItems={finalItems} submitAnswers={submitAnswers} />
                        </div>
                    </DndProvider>
                </div>
                </div>
            </Route>
            <Route path="/retrofit-homes/result">
                <Result 
                    gradient={gradient} 
                    background={Background} 
                    text={retrofitHomesText} 
                    badge="You've earned the NET ZERO HOME BADGE"
                    back="/retrofit-homes/game"
                    next="/sustainable-food-system/intro"
                />
            </Route>
        </Switch>
    )
}

export default RetrofitHomesGame;