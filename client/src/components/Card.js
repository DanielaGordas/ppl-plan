// import React, { useState } from 'react';
// import classes from '../styles/pages/lowcarbon.module.scss';
// import {Draggable} from 'react-beautiful-dnd';

// const Card = ({ item, index, info, setInfo }) => {

//     // const change = () => updateSelected(item.id, !item.selected);

//     // const [show, setShow] = useState(false);

//     // const openModal = () => setShow(true);  

//     // const closeModal = () => setShow(false);

//     // const [showInfo, setShowInfo] = useState(false)

//     return(
//         <div className="">
//             <Draggable draggableId={item.id.toString()} index={index} >
//                 {(provided, snapshot) => {
//                     return(
//                         <div 
//                             className={classes.Card}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             ref={provided.innerRef}
//                             style={{
//                                 border: item.selected ? '2px solid red': '2px solid grey',
//                                 userSelect: 'none',
//                                 backgroundColor: snapshot.isDragging ? '#263B4A' : '#102773',
//                                 ...provided.draggableProps.style

//                             }}
                        
//                         >
//                             {item.title}
//                         </div>
//                     )
//                 }}
//             </Draggable>
//         </div>
//     )
// }

// export default Card;

/* { show? < Modal title={title} description={description} selected={selected} change={change} show={show} closeModal={closeModal} /> : null } */