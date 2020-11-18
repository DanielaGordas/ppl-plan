import React, { useState } from 'react';
import Modal from './Modal';
import classes from '../styles/components/card.module.scss';

import { useDrag } from 'react-dnd';
import { itemTypes } from '../itemTypes';

const Card = ({id, title, description, selected, updateSelected, name}) => {

    const change = () => updateSelected(id, !selected);

    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);  

    const closeModal = () => setShow(false);

    const [{ isDragging }, drag] = useDrag({
        item: { name, type: itemTypes.CARD },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
          })
      })
 
    return(
        <div className={classes.Card} style={{border: selected ? '1px solid red': '1px solid grey'}} ref={drag}>
            <div onClick={openModal} className={classes.CardIcon}>{id}</div>
            { show? < Modal title={title} description={description} selected={selected} change={change} show={show} closeModal={closeModal} /> : null }

        </div>
    )
}

export default Card;