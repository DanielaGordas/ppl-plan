import DraughtProofing from '../../images/retrofit-homes/Draught_proofing_blue_icon.svg';
import WallInsulation from '../../images/retrofit-homes/External_internal_wall_insulation_blue_icon.svg';
import HydrogenBoilers from '../../images/retrofit-homes/Hydrogen_boilers_Blue_icon.svg';
import RainwaterSystem from '../../images/retrofit-homes/Rainwater_harvesting_system_blue_icon.svg';
import SmartControls from '../../images/retrofit-homes/Smart_controls_blue_icon.svg';
import HybridPumps from '../../images/retrofit-homes/Smart_hybrid_heat_pumps_blue_icon.svg';
import SolarPanels from '../../images/retrofit-homes/Solar_panels_blue_icon.svg';
import GlazedWindows from '../../images/retrofit-homes/Triple_glazed_windows_blue_icon.svg';
import Energiesprong from '../../images/retrofit-homes/Whole_House_Energiesprong_blue_icon.svg';

export const retrofitHomesGame = {
    id: 3, 
    title: "Retrofit Homes",
    intro: "Congratulations! You’ve been selected to take part in a new housing retrofitting scheme, which will help make UK homes more energy efficient. Pick from the 10 home improvement options and prioritise which you think are best for your home.",
    instructions: "Review each housing upgrade and then drag them into the numbered circles to prioritise them. You can always swap them over if you’ve put them in the wrong order."
}


export const retrofitHomesAnswers = [
    {
        id: 1, 
        name: "Whole House",
        icon: Energiesprong,
        description: "‘Energiesprong’, pioneered in the Netherlands, could transform 41% of UK housing to net zero emissions. The cost of Energiesprong would be covered by energy savings and reduced maintenance, as well as mass deployment which would result in significantly reduced installation costs.",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 2, 
        name: "Smart Hybrid Heat Pumps",
        icon: HybridPumps,
        description: "Smart hybrid heat pumps are efficient at heating homes, easy to install and cost £5-10,000. They charge and store energy when electricity is cheap, e.g. over night, to be used at peak times. Smart controls switch to gas, oil or hydrogen when the heat pump needs additional energy.",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 3, 
        name: "Hydrogen Boilers",
        icon: HydrogenBoilers,
        description: "Hydrogen boilers are currently being developed and are a more sustainable alternative to natural gas boilers, producing neither carbon dioxide or carbon monoxide. With more research they could easily replace existing boilers for about the same cost!",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 4, 
        name: "Solar Panels",
        icon: SolarPanels,
        description: "Solar panels have come down in cost by 70% since 2010, costing roughly between £4,000 and £6,000 for the average UK household. Solar panels add value to your house while significantly reducing energy bills.",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 5, 
        name: "External or Internal Wall Insulation",
        icon: WallInsulation,
        description: "External or internal wall insulation on average cost £15,000 and £7,400 respectively, with savings up to £455 per year. Insulation is effective at retaining heat and therefore reduces energy bills and emissions.",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 6, 
        name: "Rainwater Harvesting System",
        icon: RainwaterSystem,
        description: "Rainwater harvesting system recycled rainwater can be used for non-drinking purposes, such as flushing toilets. Toilets account for 30% of household water usage. The cost is £2-3,000 for the average family home. This could reduce water bills by 25-30% on average.",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 7, 
        name: "Triple Glazed Windows",
        icon: GlazedWindows,
        description: "Triple glazed windows can prevent the loss of 20% of heat in homes lost through windows. These cost on average £2,000 for a 2 bedroom house and the savings can amount to 15% on energy bills (or 25% if you don’t already have double glazing).",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 8, 
        name: "Draught-proofing of Floors",
        icon: DraughtProofing,
        description: "Draught-proofing of floors, windows and doors can be a quick and cost effective way of sealing homes.  Doing this reduces heat loss, saving energy and saving costs of around £200 for the average family home.",
        column: 'All',
        game: "Retrofit Homes"
    },
    {
        id: 9, 
        name: "Smart Controls",
        icon: SmartControls,
        description: "Smart controls save energy by changing temperature with maximum efficiency via an app so only the right amount of energy is used in each room. Smart controls result in an average energy saving of 19% and can save consumers approximately £110 per year on gas bills.",
        column: 'All',
        game: "Retrofit Homes"
    }
  
]