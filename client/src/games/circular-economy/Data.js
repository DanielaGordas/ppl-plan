import FoodShares from '../../images/circular-economy/Food_shares_blue_icon.svg';
import ClothesSwaps from '../../images/circular-economy/Clothes_swaps_blue_icon.svg';
import FurnitureSwaps from '../../images/circular-economy/Furniture_swaps_blue_icon.svg';
import LocalFood from '../../images/circular-economy/Locally_grown_food_blue_icon.svg';
import HomeTools from '../../images/circular-economy/Home_and_garden_tools_blue_icon.svg';
import Cars from '../../images/circular-economy/Cars_blue_icon.svg';
import Bikes from '../../images/circular-economy/Bikes_blue_icon.svg';
import Children from '../../images/circular-economy/Childrens_pets_toys_blue_icon.svg';
import Electronics from '../../images/circular-economy/Electronics_blue_icon.svg';

export const circularEconomyGame = {
    id: 4, 
    title: "Low waste / circular society",
    intro: "Cutting waste and creating resilient communities is more important than ever. Our local community is voting on some ideas to implement. Do you think they should happen now, in the future or never?",
    instructions: "Tap on the proposals to find out more. Then drag them into the box to vote when/if you think we should implement them."
}

export const circularEconomyAnswers = [
    {
        id: 1, 
        name: "Food sharing",
        description: "£17 billion worth of food ends up in landfill each year in the UK - much of this could have been eaten by those in need. Individuals currently are responsible for this. Food sharing events combat waste by sharing surplus or unwanted food with those in the community, helping to improve social and economic equality and building stronger communities.",
        column: 'All',
        game: "Circular Economy",
        svg: FoodShares
    },
    {
        id: 2, 
        name: "Clothes swaps",
        description: "Around 30% of clothing in wardrobes in the UK has not been worn for at least a year, and an estimated £140 million worth of used clothing also goes to landfill in the UK every year. Clothes swaps offer people the chance to exchange clothes, which helps build stronger communities and reduce clothing going to landfill, also saving you money!",
        column: 'All',
        game: "Circular Economy",
        svg: ClothesSwaps
    },
    {
        id: 3, 
        name: "Furniture swaps",
        description: "Furniture swaps and communal repairs/repair workshops could greatly extend the life of furniture and provide people with more sustainable options. 22 million small items of furniture are thrown away every year in the UK.",
        column: 'All',
        game: "Circular Economy",
        svg: FurnitureSwaps
    },
    {
        id: 4, 
        name: "Locally grown food",
        description: "Community allotments are an excellent way for children and young people to learn about growing food. Individual/family allotments offer great exercise and a regular supply of fruit and vegetables. You can use household food waste to compost too!",
        column: 'All',
        game: "Circular Economy",
        svg: LocalFood
    },
    {
        id: 5, 
        name: "Home and garden tools",
        description: "The average person spends almost £200 per year on tools and uses them infrequently. A shared approach could save huge amounts of resources and money. Maybe it operates like the library?",
        column: 'All',
        game: "Circular Economy",
        svg: HomeTools
    },
    {
        id: 6, 
        name: "Cars",
        description: "Car sharing schemes help relieve local traffic congestion, saving up to £1,000 per year (on fuel costs, parking and other vehicle running costs).",
        column: 'All',
        game: "Circular Economy",
        svg: Cars
    },
    {
        id: 7, 
        name: "Bikes",
        description: "Bike sharing schemes enable users to access bikes 24/7 in urban areas, facilitating the use of cycling rather than other non-sustainable modes of transport.  A healthy, eco-friendly and fun way to travel!",
        column: 'All',
        game: "Circular Economy",
        svg: Bikes
    },
    {
        id: 8, 
        name: "Childrens’ or pets’ toys",
        description: "Every year in the UK, 8.5 million nearly new toys are thrown out as children and pets grow out of, or lose interest in, them. These can be redistributed to other children or pets as needed, reducing the amount in landfill.",
        column: 'All',
        game: "Circular Economy",
        svg: Children
    },
    {
        id: 9, 
        name: "Electronics",
        description: "The UK could save £370 million if all the old small electricals that are either thrown away or hoarded were recycled.",
        column: 'All',
        game: "Circular Economy",
        svg: Electronics
    },  
]