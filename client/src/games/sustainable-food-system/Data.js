import EdibleFoodWaste from '../../images/sustainable-food-system/Ban_edible_food_waste_icon.svg';
import BetterFoodLabels from '../../images/sustainable-food-system/Better_food_labels_icon.svg';
import CommunityComposting from '../../images/sustainable-food-system/Community_composting_icon.svg';
import EducationOnPlantBased from '../../images/sustainable-food-system/Education_on_plant-based_diets_icon.svg';
import EnvironmentalFoodLabels from '../../images/sustainable-food-system/Environmental_food_labels_icon.svg';
import HouseholdFoodWaste from '../../images/sustainable-food-system/Household_food_waste_collection_icon.svg';
import CommunityGrowingProjects from '../../images/sustainable-food-system/Invest_community_growing_projects_icon.svg';
import LocalSupplierContracts from '../../images/sustainable-food-system/Local supplier contracts_icon.svg';
import PetitionSchools from '../../images/sustainable-food-system/Petition_schools_hospitals__offer_more_plant-based_options_icon.svg';
import EatingUgly from '../../images/sustainable-food-system/Promote_eating_‘ugly’_fruits_icon.svg';
import EatingSeasonsal from '../../images/sustainable-food-system/Promote_eating_seasonally_icon.svg';
import SustainableFarming from '../../images/sustainable-food-system/Promote_sustainable_farming_icon.svg';
import Repurpose from '../../images/sustainable-food-system/Repurpose_farmland_icon.svg';
import TakePart from '../../images/sustainable-food-system/Take_part_plant-based_research_development_icon.svg';

export const sustainableFoodGame = {
    id: 2, 
    title: "Sustainable Food System",
    intro: "Gill is setting up a new supermarket, ‘Planet Food’, and wants it to be the most sustainable place to shop in town. She wants to educate shoppers and other businesses on plant based diets, local food and reducing food waste. What ideas should Gill promote?",
    instructions: "Choose 2 ideas from each category to help Gill set up her educational campaign."
}


export const sustainableFoodAnswers = [
    {
        id: 1, 
        name: "Total ban on edible food waste",
        description: "Throwing away edible food should be banned, and supermarkets must donate food nearing its best-before date to food banks and charities.",
        column: 'food waste',
        category: 'food waste',
        game: "Sustainable Food System",
        svg: EdibleFoodWaste
    },
    {
        id: 2, 
        name: "Promote eating ‘ugly’ fruits and vegetables",
        description: "Selling ‘ugly’ produce at reduced rates will reduce edible food waste. This could also provide a cheaper option to those on lower incomes and allow farmers to increase their profits.",
        column: 'food waste',
        category: 'food waste',
        game: "Sustainable Food System",
        svg: EatingUgly
    },
    {
        id: 3, 
        name: "Community composting",
        description: "Community composting will reduce the food waste going to landfill and could provide good quality compost to community allotments and local farmers.",
        column: 'food waste',
        category: 'food waste',
        game: "Sustainable Food System",
        svg: CommunityComposting
    },
    {
        id: 4, 
        name: "Household food waste collection",
        description: "Guarantee food waste collections for all UK households. Provide education this will increase awareness of how much food goes in the bin and encourage people to waste less.",
        column: 'food waste',
        category: 'food waste',
        game: "Sustainable Food System",
        svg: HouseholdFoodWaste
    },
    {
        id: 5, 
        name: "Better food labels",
        description: "Simplify food labels by using just one label (instead of 2 or 3) to show the expiration date, maintaining food safety and ending confusion and excess food waste.",
        column: 'food waste',
        category: 'food waste',
        game: "Sustainable Food System",
        svg: BetterFoodLabels
    },
    {
        id: 6, 
        name: "Environmental food labels",
        description: "Food producers and manufacturers must label products to show their environmental impact, particularly greenhouse gas emissions, enabling customers to make more informed decisions",
        column: 'animal agriculture & diet',
        category: 'animal agriculture & diet',
        game: "Sustainable Food System",
        svg: EnvironmentalFoodLabels
    },
    {
        id: 7, 
        name: "Education on plant-based diets",
        description: "Increase awareness of the carbon intensity of meat and dairy, whilst educating people on how to eat a healthy balanced plant-based diet, including added health and financial benefits.",
        column: 'animal agriculture & diet',
        category: 'animal agriculture & diet',
        game: "Sustainable Food System",
        svg: EducationOnPlantBased
    },
    {
        id: 8, 
        name: "Petition schools and hospitals to offer more plant-based options",
        description: "Support the introduction of plant-based options in government funded institutions, which account for 30% of all meals eaten in the UK.",
        column: 'animal agriculture & diet',
        category: 'animal agriculture & diet',
        game: "Sustainable Food System",
        svg: PetitionSchools
    },
    {
        id: 9, 
        name: "Promote sustainable farming",
        description: "Help farmers become more sustainable by moving away from intensive farming, which is responsible for biodiversity loss, greenhouse gas emissions, air and water pollution, and degraded soils. Offer grants and redirect existing subsidies towards more sustainable farming methods.",
        column: 'animal agriculture & diet',
        category: 'animal agriculture & diet',
        game: "Sustainable Food System",
        svg: SustainableFarming
    },
    {
        id: 10, 
        name: "Take part in plant-based research and development",
        description: "Plant-based meat alternatives need more research and development to help achieve an industry with 90% fewer greenhouse gas emissions than beef. They use less land, do not require antibiotics, and will help people eat more sustainably.",
        column: 'animal agriculture & diet',
        category: 'animal agriculture & diet',
        game: "Sustainable Food System",
        svg: TakePart
    },
    {
        id: 11, 
        name: "Prioritising local suppliers",
        description: "Contracting local suppliers will increase food security across villages, towns and cities whilst boosting the economy and jobs in these areas.",
        column: 'localised food system',
        category: 'localised food system',
        game: "Sustainable Food System",
        svg: LocalSupplierContracts
    },
    {
        id: 12, 
        name: "Promote eating seasonally",
        description: "Eating seasonal foods can simplify complex supply chains and reduce the carbon footprint of our food by up to 10%. Foods that are grown locally and can be consumed sooner have a higher nutritional content than food that has travelled for longer to reach supermarkets.",
        column: 'localised food system',
        category: 'localised food system',
        game: "Sustainable Food System",
        svg: EatingSeasonsal
    },
    {
        id: 13, 
        name: "Invest in community growing projects",
        description: "Invest in local projects which promote learning and give people the opportunity to produce their own food. This could include exchanging land for labour or labour for produce, for example volunteers helping local farmers to plant and harvest in exchange for fresh fruit and vegetables.",
        column: 'localised food system',
        category: 'localised food system',
        game: "Sustainable Food System",
        svg: CommunityGrowingProjects
    },
    {
        id: 14, 
        name: "Introduce educational programmes on growing food sustainably",
        description: "For example, school vegetable gardens can help show children the connections between humans, food and the environment. This is proven to improve academic achievement, promote healthy lifestyles, as well as encouraging community and social development.",
        column: 'localised food system',
        category: 'localised food system',
        game: "Sustainable Food System",
        svg: EducationOnPlantBased
    },
    {
        id: 15, 
        name: "Repurpose farmland",
        description: " 70% of the UK is farmland - if we free up more land by moving away from emission-heavy animal farming and towards horticulture farming, we can use it instead for large-scale rewilding. We could see economic and health benefits by significantly increasing our domestic supply of fruits, vegetables, nuts and pulses, as well as creating natural carbon stores from rewilding.",
        column: 'localised food system',
        category: 'localised food system',
        game: "Sustainable Food System",
        svg: Repurpose
    }
  
]