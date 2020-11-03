import React, { useState } from 'react';
import Modal from './Modal';
import classes from '../styles/components/card.module.scss';

const Card = ({id, icon, name, description, selected, updateSelected}) => {

    const change = () => updateSelected(id, !selected);

    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);

    const closeModal = () => setShow(false);
 
    return(
        <div className={classes.Card} style={{border: selected ? '1px solid red': '1px solid grey'}}>
            <div onClick={openModal} className={classes.CardIcon}>{icon}</div>
            { show? < Modal name={name} description={description} selected={selected} change={change} show={show} closeModal={closeModal} /> : null }

        </div>
    )
}

export default Card;