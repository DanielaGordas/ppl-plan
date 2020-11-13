import React, { useState } from 'react';
import Modal from './Modal';
import classes from '../styles/components/card.module.scss';

const Card = ({id, title, description, selected, updateSelected}) => {

    const change = () => updateSelected(id, !selected);

    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);  

    const closeModal = () => setShow(false);
 
    return(
        <div className={classes.Card} style={{border: selected ? '1px solid red': '1px solid grey'}}>
            <div onClick={openModal} className={classes.CardIcon}>{id}</div>
            { show? < Modal title={title} description={description} selected={selected} change={change} show={show} closeModal={closeModal} /> : null }

        </div>
    )
}

export default Card;