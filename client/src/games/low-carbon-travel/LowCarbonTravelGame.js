import React, { useState } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import { Switch, Route, Link } from 'react-router-dom';
import LowCarbonInfo from './LowCarbonInfo';
import LowCarbonResult from './LowCarbonResult';
import '../../styles/pages/circulareconomy.scss';
import classes from '../../styles/pages/lowcarbon.module.scss';
import Intro from '../../components/Intro';



const MovableItem = ({name, setItems, column, index}) => {
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
            } 
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;


  return (
      <div ref={drag} className={classes.Card} style={{  opacity}}>
          {name}
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
        <div ref={drop} className={className}>
            {children}
        </div>
    )
}

const LowCarbonTravelGame = () => {

    const lowCarbonTravelGame = {
        id: 1, 
        title: "Low Carbon Travel",
        intro: "You’re stuck in traffic on your way to work again and daydreaming of a future where UK commuters don’t waste 115 hours sitting in traffic annually. What does that future look like?",
        instructions: "Choose 5 of the 11 low carbon travel options to shape the future of transport by dragging them onto the scale, below. The gauge will indicate whether your future commute will be improved by individual electric vehicles or more efficient public transport services."
    }


    const lowCarbonTravelAnswers = [
        {
            id: 1, 
            name: "EV charging points",
            description: "Invest in a network of car charging stations, with fast chargers every 50km along motorways, and provide better subsidies for home charging points.",
            column: 'All',
            category: 'electric car ownership'
        },
        {
            id: 2, 
            name: "Work based car sharing scheme",
            description: "Employees carpooling could save up to £1000 on fuel and vehicle running costs, reduce pollution, and reduce demand for car parking spaces by 50%.",
            column: 'All',
            category: 'electric car ownership'
        },
        {
            id: 3, 
            name: "Car scrappage scheme",
            description: "Individuals receive money towards an electric vehicle for scrapping their old polluting car, which will boost the UK’s car manufacturing industry, reduce air pollution and reduce emissions.",
            column: 'All',
            category: 'electric car ownership'
        },
        {
            id: 4, 
            name: "Tax benefits",
            description: "Make new electric vehicles more affordable for individuals and businesses by increasing benefits, such as purchase tax and VAT.",
            column: 'All',
            category: 'electric car ownership'
        },
        {
            id: 5, 
            name: "Purchase grants",
            description: "Introduce Purchase Grants to give people money to buy electric vehicles, making them more financially accessible to low income households.",
            column: 'All',
            category: 'electric car ownership'
        },
        {
            id: 6, 
            name: "Electric bus network",
            description: "Electrify the bus network resulting in cheaper and more reliable public transport, as well as improvements in local air quality and public health.",
            column: 'All',
            category: 'mass transit'
        },
        {
            id: 7, 
            name: "Electric rail network",
            description: "Enjoy smoother, quieter, more reliable journeys with an electrified rail network. Boost the economy by potentially doubling the number of jobs in this sector, as well as saving money on maintenance and running costs.",
            column: 'All',
            category: 'mass transit'
        },
        {
            id: 8, 
            name: "National cycling network",
            description: "Boost the economy by £5 million annually by investing in a National Cycle Network with dedicated city cycle lanes, making it safer for cyclists and improving public health as a result of regular exercise and cleaner air.",
            column: 'All',
            category: 'mass transit'
        },
        {
            id: 9, 
            name: "Car-free zones",
            description: "Car-free school zones and residential areas make it safer for children to walk and cycle to school, while reducing congestion and air pollution and improving public health.",
            column: 'All',
            category: 'mass transit'
        },
        {
            id: 10, 
            name: "Improve existing public transport",
            description: "Improve public transport efficiency and reliability by optimising bus routes and reclaiming roads for dedicated bus/tram lanes in cities.",
            column: 'All',
            category: 'mass transit'
        }
      
    ]

    const [game, setGame] = useState(lowCarbonTravelGame);
    const [items, setItems] = useState(lowCarbonTravelAnswers);
    const isMobile = window.innerWidth < 600;

    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item) => item.column === columnName)
        .map((item, index) => (
            <MovableItem key={item.id} name={item.name} column={item.column} setItems={setItems} index={index} />
        ))
    }

    const massTransit = [];
    const electricCars = [];


    items.map(item => {
        if (item.category === "electric car ownership" && item.column !== "All") {
            electricCars.push(item);
        } else if (item.category === "mass transit" && item.column !== "All"){
            massTransit.push(item);
        }
        return item;
    })


    const setNeedleStyle = () => {
        let style = {};
        if (electricCars.length - massTransit.length === 1) {
            const firstStyle = {transform: 'translate(-50%, -50%) rotate(-30deg)'};
            style = Object.assign(style, firstStyle);
        }
        if (electricCars.length - massTransit.length === 2) {
            const secondStyle = {transform: 'translate(-50%, -50%) rotate(-45deg)'};
            style = Object.assign(style, secondStyle);
        }
        if (electricCars.length - massTransit.length === 3) {
            const thirdStyle = {transform: 'translate(-50%, -50%) rotate(-55deg)'};
            style = Object.assign(style, thirdStyle);
        }
        if (electricCars.length - massTransit.length === 4) {
            const fourthStyle = {transform: 'translate(-50%, -50%) rotate(-65deg)'};
            style = Object.assign(style, fourthStyle);
        }
        if (massTransit.length - electricCars.length === 1) {
            const fifthStyle = {transform: 'translate(-50%, -50%) rotate(+30deg)'};
            style = Object.assign(style, fifthStyle);
        }
        if (massTransit.length - electricCars.length === 2) {
            const sixthStyle = {transform: 'translate(-50%, -50%) rotate(+45deg)'};
            style = Object.assign(style, sixthStyle);
        }
        if (massTransit.length - electricCars.length === 3) {
            const seventhStyle = {transform: 'translate(-50%, -50%) rotate(+55deg)'};
            style = Object.assign(style, seventhStyle);
        }
        if (massTransit.length - electricCars.length === 4) {
            const eigthStyle = {transform: 'translate(-50%, -50%) rotate(+65deg)'};
            style = Object.assign(style, eigthStyle);
        }
        if (massTransit.length - electricCars.length === 0) {
            const ninthStyle = {transform: 'translate(-50%, -50%) rotate(0deg)'};
            style = Object.assign(style, ninthStyle);
        }
        if (massTransit.length - electricCars.length === 5) {
            const tenthStyle = {transform: 'translate(-50%, -50%) rotate(+90deg)'};
            style = Object.assign(style, tenthStyle);
        }
        if (electricCars.length - massTransit.length === 5) {
            const eleventhStyle = {transform: 'translate(-50%, -50%) rotate(-90deg)'};
            style = Object.assign(style, eleventhStyle);
        }

        return style;
    }


    return(
        <Switch>
            <Route exact path="/lowcarbon">
                <LowCarbonInfo title={game.title} />
            </Route>
            <Route path="/lowcarbon/intro">
                <Intro text={game.intro} link='/lowcarbon/game' game='/lowcarbon'/>
            </Route>
            <Route path="/lowcarbon/game">
                <div className={classes.GameNav}>
                  <Link to='/retrofithomes/intro'>Back</Link>
                  <a className="" href="#">Start over</a>
                </div>
                <div className={classes.Instructions}>
                  <h3>{game.title}</h3>
                  <p>{game.instructions}</p>
                </div>   
                <div className="Container">            
                    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>
                        <Column title='All' className={classes.Box}>
                            {returnItemsForColumn('All')}
                        </Column>
                        <div className="Choices">
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
                        </div>
                        <div className={classes.Speedometer}>
                            <div className={classes.HalfCircle}></div>
                            <div className={classes.Needle} style={setNeedleStyle()}></div>
                            <div className={classes.Bottom}></div>
                        </div>
                        <button className="Btn">Complete!</button>
                    </DndProvider>
                </div>
            </Route>
            <Route path="/lowcarbon/result">
                <LowCarbonResult />
            </Route>
        </Switch>
    )
}

export default LowCarbonTravelGame;