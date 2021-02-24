import CarScrappageScheme from '../../images/low-carbon/Car_scrappage_scheme.svg';
import CarFreeZones from '../../images/low-carbon/Car-free_zones.svg';
import ElectricBusNetwork from '../../images/low-carbon/Electric_bus_network.svg';
import ElectricRailNetwork from '../../images/low-carbon/Electric_rail_network.svg';
import EmployerCarSharingScheme from '../../images/low-carbon/Employer_car_sharing_scheme.svg';
import EvChargingPoints from '../../images/low-carbon/EV_charging_points.svg';
import ImproveExistingPublicTransport from '../../images/low-carbon/Improve_existing_public_transport.svg';
import NationalCyclingNetwork from '../../images/low-carbon/National_cycling_network.svg';
import PurchaseGrants from '../../images/low-carbon/Purchase_grants.svg';
import TaxBenefits from '../../images/low-carbon/Tax_benefits.svg';

export const lowCarbonTravelGame = {
    id: 1, 
    title: "Low Carbon Travel",
    intro: "The UK is dominated by gas-guzzling cars. They are warming the planet, pollute our air and most commuters waste 115 hours sitting in traffic every year... What do you think the future of transport looks like?",
    instructions: "Transport is complex. Choose 5 of the 10 low carbon travel options to shape the future of transport by dragging them into the boxes below. The gauge below shows you if your future is more electric vehicle or public transit focused."
}


export const lowCarbonTravelAnswers = [
    {
        id: 1, 
        name: "EV charging points",
        description: "Invest in a network of car charging stations, with fast chargers every 50km along motorways, and provide better subsidies for home charging points.",
        column: 'All',
        category: 'electric car ownership',
        game: "Low Carbon Travel",
        svg: EvChargingPoints
    },
    {
        id: 2, 
        name: "Work based car sharing scheme",
        description: "Employees carpooling could save up to £1000 on fuel and vehicle running costs, reduce pollution, and reduce demand for car parking spaces by 50%.",
        column: 'All',
        category: 'electric car ownership',
        game: "Low Carbon Travel",
        svg: EmployerCarSharingScheme
    },
    {
        id: 3, 
        name: "Car scrappage scheme",
        description: "Individuals receive money towards an electric vehicle for scrapping their old polluting car, which will boost the UK’s car manufacturing industry, reduce air pollution and reduce emissions.",
        column: 'All',
        category: 'electric car ownership',
        game: "Low Carbon Travel",
        svg: CarScrappageScheme
    },
    {
        id: 4, 
        name: "Tax benefits",
        description: "Make new electric vehicles more affordable for individuals and businesses by increasing benefits, such as purchase tax and VAT.",
        column: 'All',
        category: 'electric car ownership',
        game: "Low Carbon Travel",
        svg: TaxBenefits
    },
    {
        id: 5, 
        name: "Purchase grants",
        description: "Introduce Purchase Grants to give people money to buy electric vehicles, making them more financially accessible to lower income households.",
        column: 'All',
        category: 'electric car ownership',
        game: "Low Carbon Travel",
        svg: PurchaseGrants
    },
    {
        id: 6, 
        name: "Electric bus network",
        description: "Electrify the bus network resulting in cheaper and more reliable public transport, as well as improvements in local air quality and public health.",
        column: 'All',
        category: 'mass transit',
        game: "Low Carbon Travel",
        svg: ElectricBusNetwork
    },
    {
        id: 7, 
        name: "Electric rail network",
        description: "Enjoy smoother, quieter, more reliable journeys with an electrified rail network. Boost the economy by potentially doubling the number of jobs in this sector, as well as saving money on maintenance and running costs.",
        column: 'All',
        category: 'mass transit',
        game: "Low Carbon Travel",
        svg: ElectricRailNetwork
    },
    {
        id: 8, 
        name: "National cycling network",
        description: "Boost the economy by £5 million annually by investing in a National Cycle Network with dedicated city cycle lanes, making it safer for cyclists and improving public health as a result of regular exercise and cleaner air.",
        column: 'All',
        category: 'mass transit',
        game: "Low Carbon Travel",
        svg: NationalCyclingNetwork
    },
    {
        id: 9, 
        name: "Work from home",
        description: "Fit high speed broadband and encourage those who can to keep working from home. This could alleviate traffic and pollution.",
        column: 'All',
        category: 'mass transit',
        game: "Low Carbon Travel",
        svg: CarFreeZones
    },
    {
        id: 10, 
        name: "Improve existing public transport",
        description: "Improve public transport efficiency and reliability by optimising bus routes and reclaiming roads for dedicated bus/tram lanes in cities.",
        column: 'All',
        category: 'mass transit',
        game: "Low Carbon Travel",
        svg: ImproveExistingPublicTransport
    }
  
]