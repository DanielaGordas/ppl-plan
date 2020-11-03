// Component that contains the cards of the game
import React, { useState } from 'react';
import Card from './Card';
import classes from '../styles/components/box.module.scss';

const Box = ({ initialCards }) => {

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
        <div>
            <div className={classes.Box}>
                {cards.map(card => (
                    <Card key={card.id} {...card} updateSelected={updateSelected} />
                ))}
            </div>
        </div>
    )
}

export default Box;
