import React from 'react';
import classes from '../styles/components/box.module.scss';
import {Droppable} from 'react-beautiful-dnd';
import Card from './Card';


const Box = ({id, items}) => {
    return(
        <div>
            <Droppable droppableId={id} direction="horizontal">
                {(provided, snapshot) => {
                    return(
                        <div
                        className={classes.Box}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'
                        }}
                        >
                            {items.map((item, index) => {
                                return(
                                    <Card key={item.id} item={item} index={index}/>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}

export default Box;