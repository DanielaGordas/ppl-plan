import React, { useState, useEffect } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import '../../styles/pages/circulareconomy.scss';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { Switch, Route, Link } from 'react-router-dom';
import RetrofitHomesResult from './RetrofitHomesResult';
import classes from '../../styles/pages/lowcarbon.module.scss'
import Intro from '../../components/Intro';
import styles from '../../styles/pages/retrofit.module.scss';
import axios from 'axios';
import Modal from '../../components/Modal';

// images and icons

import {FaTrain, FaCar, FaAngleDown} from 'react-icons/fa';
import { BiArrowBack, BiRevision } from "react-icons/bi";
import Guy from '../../images/retrofit-homes/Character 3a.svg';
import IntroBackground from '../../images/retrofit-homes/Game_3_Background_Screen.svg';
import DraughtProofing from '../../images/retrofit-homes/Draught_proofing_icon.svg';
import WallInsulation from '../../images/retrofit-homes/External_internal_wall_insulation_icon.svg';
import HydrogenBoilers from '../../images/retrofit-homes/Hydrogen_boilers_icon.svg';
import RainwaterSystem from '../../images/retrofit-homes/Rainwater_harvesting_system_icon.svg';
import SmartControls from '../../images/retrofit-homes/Smart_controls_icon.svg';
import HybridPumps from '../../images/retrofit-homes/Smart_hybrid_heat_pumps_icon.svg';
import SolarPanels from '../../images/retrofit-homes/Solar_panels_icon.svg';
import GlazedWindows from '../../images/retrofit-homes/Triple_glazed_windows_icon.svg';
import Energiesprong from '../../images/retrofit-homes/Whole_House_Energiesprong_icon.svg';

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
        item: { name, column, type:'Our first type'},
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

    const opacity = isDragging ? 0.4 : 1;

    const getDisplay = () => {
      if(column === "All" && index === 0 || column === "1" || column === "2" || column === "3" || column === "4" || column === "5" || column === "6" || column === "7" || column === "8" || column === "9" ) {
          return 'flex'
      } else {
        return 'none'
      }
    }

    const getClass = () => {
      if(column === "1" || column === "2" || column === "3" || column === "4" || column === "5" || column === "6" || column === "7" || column === "8" || column === "9") {
        return `${styles.RoundCard} ${styles.Translate}`
      } else {
        return `${styles.RoundCard}`
      }
    }

    useEffect(()=> {
        if(column === "All" && index === 0 ) {
            setInfo([name, icon, description]);
        }
    }, [index])


    return (
      <div ref={drag} className={getClass()} style={{  opacity, display: getDisplay() }}>
          <img src={icon} alt={name} className={styles.Icon}  />
      </div>
    )
}


const Column = ({children, className, title}) => {

    const [{isOver, canDrop}, drop] = useDrop({
        accept: 'Our first type',
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

const RetrofitHomesGame = () => {

    const retrofitHomesGame = {
        id: 3, 
        title: "Retrofit Homes",
        intro: "You’ve been selected to take part in a new housing retrofitting scheme, which will help make UK homes more energy efficient. Choose your own home improvements, funded by the government. Pick from the home improvement options and prioritise which you think are best for your home.",
        instructions: "Drag the housing upgrades into the numbered circles to prioritise them. You can always swap them over if you wish."
    }


    const retrofitHomesAnswers = [
        {
            id: 1, 
            name: "Whole House",
            icon: Energiesprong,
            description: "‘Energiesprong’, pioneered in the Netherlands, could transform 41% of UK housing to net zero emissions.",
            column: 'All'
        },
        {
            id: 2, 
            name: "Smart Hybrid Heat Pumps",
            icon: HybridPumps,
            description: "Smart hybrid heat pumps are efficient at heating homes, easy to install and cost £5-10,000.",
            column: 'All'
        },
        {
            id: 3, 
            name: "Hydrogen Boilers",
            icon: HydrogenBoilers,
            description: "Hydrogen boilers are currently being developed and are a more sustainable alternative to natural gas boilers, producing neither carbon dioxide or carbon monoxide.",
            column: 'All'
        },
        {
            id: 4, 
            name: "Solar Panels",
            icon: SolarPanels,
            description: "Solar panels have come down in cost by 70% since 2010, costing roughly between £4,000 and £6,000 for the average UK household.",
            column: 'All'
        },
        {
            id: 5, 
            name: "External or Internal Wall Insulation",
            icon: WallInsulation,
            description: "External or internal wall insulation on average cost £15,000 and £7,400 respectively, with savings up to £455 per year.",
            column: 'All'
        },
        {
            id: 6, 
            name: "Rainwater Harvesting System",
            icon: RainwaterSystem,
            description: "Rainwater harvesting system refers to the collection, storage and distribution of recycled rainwater for non-drinking purposes, such as flushing toilets.",
            column: 'All'
        },
        {
            id: 7, 
            name: "Triple Glazed Windows",
            icon: GlazedWindows,
            description: "Triple glazed windows can prevent the loss of 20% of heat in homes lost through windows.",
            column: 'All'
        },
        {
            id: 8, 
            name: "Draught-proofing of Floors",
            icon: DraughtProofing,
            description: "Draught-proofing of floors, windows and doors can be a quick and cost effective way of sealing homes.",
            column: 'All'
        },
        {
            id: 9, 
            name: "Smart Controls Aim",
            icon: SmartControls,
            description: "Smart controls aim to save energy by increasing and decreasing temperature with maximum efficiency. ",
            column: 'All'
        }
      
    ]

    const [game, setGame] = useState(retrofitHomesGame);
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

    // decides the result of the game based
    const result = () => {
        let result = ""
        // if(massTransit.length > electricCars.length) {
        //    result = "mass transit"
        // } else {
        //     result = "electric cars"
        // }
        return result;
    }

    // retrieves guest user details from localStorage
    const guestDetails =JSON.parse(window.localStorage.getItem('guest'));
    
    // filters answers that are in the 5 selected columns
    const finalItems = items.filter((item) => item.column !== "All")

    // retrieves result from Local Storage
    const retrofitHomesText = JSON.parse(window.localStorage.getItem('result3'));

    const [retrofitHomesResult, setRetrofitHomesResult] = useState(retrofitHomesText || "")
    // save the result to Local Storage
    useEffect(() => {
        window.localStorage.setItem('result3', JSON.stringify(retrofitHomesResult));
    }, [retrofitHomesResult])

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
                    setRetrofitHomesResult(result())
                    handleRedirect(res)
                })
                    .catch(err => console.log(err))
                })
        }
    }

    const handleRedirect = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/retrofithomes/result'
        } else {
            window.location = '/retrofithomes/game'
        }
    }


    const gradient = "rgba(156, 199, 66, 1),rgba(255, 255, 255, 1)";

    const startOver = () => {
        setItems(retrofitHomesAnswers)
    }

    return(
        <Switch>
            <Route path="/retrofithomes/intro">
                <Intro 
                    text={game.intro}
                    link='/retrofithomes/game'
                    game='/retrofithomes'
                    back="/circulareconomy/outro"
                    background={IntroBackground}
                    guy={Guy}
                    guyPosition="RetrofitCharacter"
                    gradient={gradient} />
            </Route>
            <Route path="/retrofithomes/game">
                <div className="GameNav">
                    <div className="NavLink">
                        <BiArrowBack className="LeftIcon"/>
                        <Link to='/retrofithomes/intro'>Back</Link>
                    </div>
                    <div className="NavLink">
                        <a className="" onClick={startOver} >Start over  </a>
                        < BiRevision className="RightIcon"/>
                    </div>
                </div>
                <div className={styles.Background}>
                <div className={classes.Instructions}>
                  <h3>{game.title}</h3>
                  <p>{game.instructions}</p>
                </div>   
                <div className="Container">            
                    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>
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
                        <Info info={info} finalItems={finalItems} submitAnswers={submitAnswers} />
                    </DndProvider>
                </div>
                </div>
            </Route>
            <Route path="/retrofithomes/result">
                <RetrofitHomesResult />
            </Route>
        </Switch>
    )
}

export default RetrofitHomesGame;