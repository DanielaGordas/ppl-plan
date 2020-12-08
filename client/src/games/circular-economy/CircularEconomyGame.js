import React, { useState } from 'react';
import { DndProvider , useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from 'react-dnd-touch-backend';
import '../../styles/pages/circulareconomy.scss'


const MovableItem = ({name, setItems}) => {
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
        item: { name, type:'Our first type'},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'Column 1'){
                changeItemColumn(item, 'Column 1')
            } else {
                changeItemColumn(item, 'Column 2')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='MovableItem' style={{  opacity }}>
            {name}
        </div>
    )
}


const Column = ({children, className, title}) => {

    const [, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
    })
    return (
        <div ref={drop} className={className}>
            {title}
            {children}
        </div>
    )
}

const CircularEconomyGame = () => {

    const circularEconomyGame = {
        id: 2, 
        title: "Low waste / circular society",
        intro: "In a low waste circular society, different responsibilities are shared among local people, the community, and the council. Your community centre is hosting a poll to decide who should take ownership for a variety of common issues. Select the issues and have your say. ",
        instructions: "Tap the issues to find out more. Then drag them into the box which represents who you think should look after or own that issue, service or item."
    }

    const circularEconomyAnswers = [
        {
            id: 1, 
            name: "Skills exchange events",
            description: "These events can build stronger communities and improve social equality by providing individuals with equal access to knowledge and skills, which will in turn boost local economies.",
            column: 'Column 1'
        },
        {
            id: 2, 
            name: "Food shares",
            description: "£17 billion worth of food ends up in landfill each year in the UK - much of this could have been eaten by those in need. Food shares are set up to combat waste by sharing surplus or unwanted food with those in the community, helping to improve social and economic equality and building stronger communities.",
            column: 'Column 1'
        },
        {
            id: 3, 
            name: "Clothes swaps",
            description: "Around 30% of clothing in wardrobes in the UK has not been worn for at least a year, and an estimated £140 million worth of used clothing also goes to landfill in the UK every year. Clothes swaps offer people the chance to exchange clothes, which helps build stronger communities and reduce clothing going to landfill, also saving you money!",
            column: 'Column 1'
        },
        {
            id: 4, 
            name: "Furniture swaps",
            description: "Furniture swaps and communal repairs/repair workshops could greatly extend the life of furniture and provide people with more sustainable options. 22 million small items of furniture are thrown away every year in the UK.",
            column: 'Column 1'
        },
        {
            id: 5, 
            name: "Cleaning of parks/beaches/public spaces",
            description: "Could the local community manage this better and more effectively than the local council or a private company?",
            column: 'Column 1'
        },
        {
            id: 6, 
            name: "Household waste and recycling collection",
            description: "Would you be happy for a community group to manage waste collection rather than the council?",
            column: 'Column 1'
        },
        {
            id: 7, 
            name: "Locally grown food",
            description: "Community allotments are an excellent way for children and young people to learn about growing food. Individual/family allotments offer great exercise and a regular supply of fruit and vegetables. A mixture of the two can benefit communities with sharing of surplus produce.",
            name: 'Column 1'
        },
        {
            id: 8, 
            title: "Home and garden tools",
            description: "The average person spends almost £200 per year on tools and uses them infrequently. A shared approach could save huge amounts of resources and money.",
            name: 'Column 1'
        },
        {
            id: 9, 
            title: "Cars",
            description: "Car sharing schemes help relieve local traffic congestion, saving up to £1,000 per year (on fuel costs, parking and other vehicle running costs).",
            name: 'Column 1'
        },
        {
            id: 10, 
            name: "Bikes",
            description: "Bike sharing schemes enable users to access bikes 24/7 in urban areas, facilitating the use of cycling rather than other non-sustainable modes of transport.  A healthy, eco-friendly and fun way to travel!",
            column: 'Column 1'
        },
        {
            id: 11, 
            name: "Books and access to libraries",
            description: "Shared libraries/collections of books, as well as book swaps, can save the need to buy lots of books, especially textbooks that are often only used for a short while. Books can be borrowed, swapped or donated for communal use, saving paper, resources, and money.",
            column: 'Column 1'
        },
        {
            id: 12, 
            name: "Childrens’ or pets’ toys",
            description: "Every year in the UK, 8.5 million nearly new toys are thrown out as children and pets grow out of, or lose interest in, them. These can be redistributed to other children or pets as needed, reducing the amount in landfill.",
            column: 'Column 1'
        },
        {
            id: 13, 
            name: "Electronics",
            description: "The UK could save £370 million if all the old small electricals that are either thrown away or hoarded were recycled.",
            column: 'Column 1'
        },
        

    ]

    const [game, setGame] = useState(circularEconomyGame);
    const [items, setItems] = useState(circularEconomyAnswers);
    const isMobile = window.innerWidth < 600;

    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item) => item.column === columnName)
        .map((item) => (
            <MovableItem key={item.id} name={item.name} setItems={setItems} />
        ))
    }
    
    return(
        <div className="Container">            
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend }>
                <Column title='Column 1' className='Column FirstColumn'>
                    {returnItemsForColumn('Column 1')}
                </Column>
                <Column title='Column 2' className='Column SecondColumn'>
                    {returnItemsForColumn('Column 2')}
                </Column>
            </DndProvider>
        </div>
    )
}


export default CircularEconomyGame;