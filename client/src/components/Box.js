// Component that contains the cards of the game
import React, { useState } from 'react';
import Card from './Card';
import classes from '../styles/components/box.module.scss';
import { FaChargingStation, FaRecycle, FaCarAlt, FaCoins, FaMoneyCheckAlt, FaBusAlt, FaTrain, FaBicycle, FaTram  } from 'react-icons/fa';
import { GiStopSign } from 'react-icons/gi';

const initialCards = [
    {id: 1, name: 'EV charging points', description: "There could be 4 million new cars on the road in the next 20 years. Make buying electric cars more accessible by investing in a network of car charging stations with fast chargers every 50km along motorways.", selected: false, icon: <FaChargingStation/>},
    {id: 2, name: 'Car sharing schemes', description: 'The average car owner produces over two tonnes of CO2 each year. If councils incentivise businesses to implement car sharing schemes for their employees, we can reduce pollution, reduce the demand for car parking spaces by 50%, and employees could save up to £1000 on fuel and vehicle running costs.', selected: false, icon: <FaCarAlt/>},
    {id: 3, name: 'Old car scrappage scheme', description: 'Start a scrappage scheme to get the most highly polluting vehicles off the road. Give car owners money towards an electric vehicle if they scrap their old car, which will boost the UK’s car manufacturing industry and improve air pollution.', selected: false, icon: <FaRecycle/>},
    {id: 4, name: 'Tax Benefits', description: 'Increase tax benefits, including purchase tax and VAT, for individuals and businesses looking to purchase new electric vehicles. When tax benefits are implemented successfully, such as in Norway, the price of an electric vehicle can equal that of a similarly sized vehicle with a combustion engine.', selected: false, icon: <FaCoins/>},
    {id: 5, name: 'Purchase Grants', description: 'Introduce Purchase Grants to make electric vehicles more financially available to low income households, as seen in Romania with a government purchase incentive of 10,000 Euros.', selected: false, icon: <FaMoneyCheckAlt/>},
    {id: 6, name: 'Electric bus network', description: 'Electrifying the public bus network will improve local air quality and therefore public health. A town with 200 electric buses could save emissions equivalent to taking 3,700 diesel cars off the road each year. The service will also have cheaper fares due to reduced maintenance and fuel costs.', selected: false, icon: <FaBusAlt/>},
    {id: 7, name: 'Electric rail network', description: "Follow Switzerland's lead with a 100% electric rail network. This will boost the economy by potentially doubling the number of jobs in this sector, as well as saving money on maintenance and running costs. Electrifying the rail network will provide smoother, quieter, and more reliable journeys for passengers.", selected: false, icon: <FaTrain/>},
    {id: 8, name: 'Cycling network', description: 'Invest in a National Cycle Network with dedicated city cycle lanes, making it safer for cyclists and improving public health as a result of regular exercise and cleaner air. In addition, the economy is likely to grow by £5 million annually by 2040, and retail sales will grow as cyclists are more likely to stop en route to their destination. Furthermore, investment in cycling infrastructure creates more jobs than investment solely in roads.', selected: false, icon: <FaBicycle/>},
    {id: 9, name: 'Car-free zones', description: 'Car-free school zones and residential areas make it safer for children to walk and cycle to school. This can reduce congestion, reduce air pollution and improve public health.', selected: false, icon: <GiStopSign/>},
    {id: 10, name: 'Improved public transport services', description: 'Measures including bus route optimisation and reclaiming roads for dedicated bus/tram lanes in cities can improve the frequency, efficiency and reliability of current public transport options.', selected: false, icon: <FaTram/>},
  ]

const Box = () => {

    // const initialState = JSON.parse(window.localStorage.getItem('cards'));
    const [cards, setCards] = useState(initialCards);


    // function that handles the selected key of each object in the cards array 
    const updateSelected = (id, newSelected) => {
        const newCards = cards.map(card => {
            if(card.id === id){
                return {...card, selected: newSelected}
            }
            return card;
        })
        setCards(newCards);
    }

    return(
        <div className={classes.BoxWrapper}>
            <h3>Choose 5 policies that you would like to see implemented:</h3>
            <div className={classes.Box}>
                {cards.map(card => (
                    <Card key={card.id} {...card} updateSelected={updateSelected} />
                ))}
            </div>
            <button className="Btn">Complete!</button>
        </div>
    )
}

export default Box;
