import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/privacy-about.module.scss';
import NavBar from '../components/NavBar';

const SourcesPage = () => {
    return (
        <>
            <NavBar />
            <div className={classes.Background}>
                <div className={classes.Content}>
                    <h1 className={classes.Title}>Sources - Game Page</h1>

                    <h2 className={classes.SubTitle}>Low Carbon Travel</h2>
                    <a href="https://peoplesplan.org/research/low-cost-travel/">Learn More</a>
                    <ol>
                        <li>Most commuters waste 115 hours sitting in traffic every year - <a href="https://inrix.com/press-releases/2019-traffic-scorecard-uk/#:~:text=In%20the%20UK%2C%20the%202019,of%20%C2%A3894%20per%20driver">Inrix Traffic Analysts</a></li>
                        <li>Employees carpooling could save up to £1000 on fuel and vehicle running costs - <a href="https://www.inchcape.co.uk/blog/driving-life/car-sharing-savings/">Inchcape Car Retailer</a></li>
                        <li>Electrify the bus network resulting in cheaper and more reliable public transport, as well as improvements in local air quality and public health - <a href="https://www.transportenvironment.org/sites/te/files/publications/Electric%20buses%20arrive%20on%20time.pdf">A Study By Transport and Environment</a></li>
                        <li>Enjoy smoother, quieter, more reliable journeys with an electrified rail network. Boost the economy by potentially doubling the number of jobs in this sector, as well as saving money on maintenance and running costs - <a href="https://img.fuelcellsworks.com/wp-content/uploads/2021/01/Alstom_DecarbonisationReport_FINAL131.pdf">Report by Alstom</a></li>
                        <li>Boost the economy by £5 billion annually by investing in a National Cycle Network - <a href="https://www.sustrans.org.uk/media/5211/sustransmanifestoukgovernment.pdf">Sustrans Manifesto</a></li>
                        <li>230,000 sustainable transport jobs could be created - <a href="https://www.ippr.org/news-and-media/press-releases/investing-in-a-green-recovery-could-create-1-6-million-new-jobs-after-covid-crisis-report-finds">The Progressive Policy Think Tank</a></li>
                    </ol>

                    <h2 className={classes.SubTitle}>Clean Energy</h2>
                    <a href="https://peoplesplan.org/research/clean-energy/">Learn More</a>
                    <ol>
                        <li>Solar energy is one of the cheapest renewables to harness - <a href="https://www.carbonbrief.org/solar-is-now-cheapest-electricity-in-history-confirms-iea#:~:text=The%20world's%20best%20solar%20power,Agency's%20World%20Energy%20Outlook%202020">Carbon Brief</a></li>

                        <li>200,000 jobs in the solar industry by 2030 - <a href="https://www.pveurope.eu/markets-money/pv-deployment-could-create-200000-green-jobs-uk-2030">Citing research by Energy Watch Group</a></li>

                        <li>Solar energy is likely to become 20-50% cheaper than previously estimated - <a href="https://www.carbonbrief.org/wind-and-solar-are-30-50-cheaper-than-thought-admits-uk-government">Carbon Brief</a></li>

                        <li>Onshore wind is the cheapest form of energy and one of the fastest growing sustainable sources of energy - <a href="https://www.edie.net/news/10/Onshore-wind-and-solar--cheapest--form-on-energy-for-two-thirds-of-global-population/#:~:text=Utility%2Dscale%20solar%20PV%20and,have%20plummeted%20in%20recent%20years">Edie Article</a></li>

                        <li>Wind already generates clean power to meet the annual needs of more than 7.25 million homes in the UK and produced 9% of the UK’s power needs in 2017 - <a href="https://www.renewableuk.com/page/WindEnergy">Renewable Energy UK</a></li>

                        <li>Biomass provided 11% of the UK’s electricity in 2019 - <a href="https://www.carbonbrief.org/analysis-uk-low-carbon-electricity-generation-stalls-in-2019#:~:text=Note%20that%20biomass%20accounted%20for,the%20Drax%20plant%20in%20Yorkshire">Carbon Brief</a></li>

                        <li>Battery storage on a large scale we could save at least £8 billion per year up to 2030</li>
                    </ol>

                    <h2 className={classes.SubTitle}>Circular Economy</h2>
                    <a href="https://peoplesplan.org/research/circular-economy/">Learn More</a>
                    <ol>
                        <li>£17 billion worth of food ends up in landfill each year in the UK - <a href="https://www.vision2020.info/assets/pdf/Vision_2020_roadmap.pdf">Vision 2020 Report</a></li>

                        <li>Around 30% of clothing in wardrobes in the UK has not been worn for at least a year - <a href="https://traid.org.uk/wp-content/uploads/2018/09/impacts_of_clothing_factsheet_23percent.pdf">23Percent Fashion Fact Sheet</a></li>

                        <li>An estimated £140 million worth of used clothing also goes to landfill in the UK every year - <a href="https://wrap.org.uk/resources/guide/textiles/clothing">WRAP Clothing Research</a></li>

                        <li>22 million small items of furniture are thrown away every year in the UK - <a href="https://www.nlwa.gov.uk/news/22-million-damaged-furniture-items-and-11000-bust-bicycles-thrown-away-each-year#:~:text=Browse%20News-,22%20million%20damaged%20furniture%20items%20and%2011%2C000%20bust%20bicycles%20thrown,year%20when%20they%20become%20damaged">North London Waste Authority</a></li>

                        <li>The average person spends almost £200 per year on tools and uses them infrequently</li>

                        <li>Every year in the UK, 8.5 million nearly new toys are thrown out as children and pets grow out of, or lose interest in, them - <a href="https://www.eastsussex.gov.uk/environment/rubbishandrecycling/factsandfigures/">East Sussex County Council Waste Factsheet</a></li>

                        <li>The UK could save £370 million if all the old small electricals that are either thrown away or hoarded were recycled - <a href="https://www.recycleyourelectricals.org.uk/press-releases/hidden-treasures-research/">Materials Focus Research</a></li>
                    </ol>

                    <h2 className={classes.SubTitle}>Retrofit Housing</h2>
                    <a href="https://peoplesplan.org/research/retrofit-our-homes/">Learn More</a>
                    <ol>
                        <li>‘Energiesprong’, pioneered in the Netherlands, could transform 41% of UK housing to net zero emissions - <a href="https://www.green-alliance.org.uk/resources/reinventing_retrofit.pdf">Green Alliance Report</a></li>

                        <li>Smart hybrid heat pumps are efficient at heating homes, easy to install and cost £5-10,000 - <a href="https://www.heatpumpsource.co.uk/blog/hybrid-heating-systems/"> Heat Pump Source</a></li>

                        <li>Solar panels have come down in cost by 70% since 2010 - <a href="https://www.seia.org/blog/2010s-solar-milestones#:~:text=Costs%20have%20fallen%20by%2070,Today%2C%20costs%20are%20around%20%2418%2C000">Solar Energy Industries Association</a></li>

                        <li>External or internal wall insulation on average cost £13,000 and £7,400 respectively - <a href="https://www.moneysupermarket.com/gas-and-electricity/solid-wall-insulation/">Money Supermarket Comparison</a></li>

                        <li>Toilets account for 30% of household water usage - <a href="https://www.waterwise.org.uk/save-water/#:~:text=About%2030%25%20of%20total%20water,water%20that's%20in%20our%20taps">Waterwise Fact Sheet</a></li>

                        <li>Triple glazed windows can prevent the loss of 20% of heat in homes lost through windows - <a href="https://www.homebuilding.co.uk/advice/triple-glazed-windows-do-they-make-sense">Homebuilding  and Renovating</a></li>

                        <li>Draft proofing saves about £20 a year and costs around £200 for a professional to draft proof the average family home - <a href="https://energysavingtrust.org.uk/advice/draught-proofing/">Energy Saving Trust</a></li>

                        <li>Smart controls result in an average energy saving of 19% - <a href="https://www.theguardian.com/environment/2015/jan/27/smart-thermostats-reviewed-which-can-save-you-most">Guardian Review of Smart controls</a></li>

                        <li>It’s estimated the UK has 28 million homes badly in need of energy efficiency improvements - <a href="https://www.reutersevents.com/sustainability/energy-efficiency-gap-buildings-undermining-uks-bid-reach-net-zero">Reuters</a></li>
                    </ol>

                    <h2 className={classes.SubTitle}>Nature</h2>
                    <a href="https://peoplesplan.org/research/protect-nature/">Learn More</a>
                    <ol>
                        <li>Roof gardens help reduce the cost of heating, help retain water to prevent flooding and can extend the life of your roof - <a href="https://www.sciencedirect.com/science/article/abs/pii/S1618866717302479">Benefits of green roofs research</a></li>

                        <li>It’s even estimated that better provision of parks could save an £2.1 billion in healthcare costs - <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/904439/Improving_access_to_greenspace_2020_review.pdf">Public Health England Report on Access to Greenspace</a></li>

                        <li>Woodland plays a vital role in recycling carbon dioxide and water vapour, as well as regulating water flow into rivers and helping to prevent flood risk - <a href="https://www.forestresearch.gov.uk/documents/1756/woodland_flood_control_iale_paper_2006.pdf">The role of woodland in flood control: Forestry Research.gov</a></li>

                        <li>Ponds can act as flood defence, providing storage for if there are more flood events in future - <a href="https://assets.publishing.service.gov.uk/media/6036c730d3bf7f0aac939a47/Working_with_natural_processes_one_page_summaries.pdf">Working with natural processes to reduce flood risk: Environment Agency</a></li>

                        <li>Nature is important for removing pollution, protecting against flooding and helps improve everyone’s mental and physical health - <a href="https://www.nature.com/articles/s41598-019-44097-3">Report in Nature</a></li>
                    </ol>

                    <h2 className={classes.SubTitle}>Research and Development</h2>
                    <a href="https://peoplesplan.org/research/invest-in-our-future/">Learn More</a>
                    <ol>
                        <li>About 25% of the UKs waste was disposed of at landfill in 2016 - <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/918270/UK_Statistics_on_Waste_statistical_notice_March_2020_accessible_FINAL_updated_size_12.pdf">UK Gov statistics on waste </a></li>

                        <li>Agriculture uses 70% of UK land - <a href="https://www.nfuonline.com/nfu-online/news/report-21117-contributions-of-uk-agriculture/">Contributions of UK Agriculture Report</a></li>

                        <li>Wave and tidal stream energy has potential to meet up to 20% of our electricity demand - <a href="https://www.gov.uk/guidance/wave-and-tidal-energy-part-of-the-uks-energy-mix#:~:text=of%20overall%20supply).-,Wave%20and%20tidal%20stream%20potential,gigawatt%20(%20GW%20)%20installed%20capacity">UK Government Guidance on Wave and Tidal</a></li>

                        <li>Cities are responsible for 75% of the world’s energy demand - <a href="https://www.cdp.net/en/articles/cities/global-cities-are-stepping-up-on-climate-action">CDP</a></li>

                        <li>Through research we have already developed advanced biofuels - <a href="https://www.irena.org/publications/2019/Nov/Advanced-biofuels-What-holds-them-back">International Renewable Energy Agency</a></li>
                    </ol>


                    <h2 className={classes.SubTitle}>Sustainable Food System</h2>
                    <a href="https://peoplesplan.org/research/invest-in-our-future/">Learn More</a>
                    <ol>
                        <li>Selling ‘ugly’ produce at reduced rates will reduce edible food waste - <a href="https://feedbackglobal.org/ugly-produce-and-food-waste-on-farms/">Feedback Foodwaste Campaign</a></li>

                        <li>Community composting will reduce the food waste going to landfill and could provide good quality compost to community allotments and local farmers - <a href="https://drawdown.org/solutions/composting">Project Drawdown</a></li>

                        <li>Simplify food labels by using just one label (instead of 2 or 3) to show the expiration date, maintaining food safety and ending confusion and excess food waste - <a href="https://www.theconsumergoodsforum.com/press_releases/companies-commit-to-simplify-food-date-labels-worldwide-by-2020-reducing-food-waste/">The Consumer Goods Forum</a></li>

                        <li>Increase awareness of the carbon intensity of meat and dairy, whilst educating people on how to eat a healthy balanced plant-based diet, including added health and financial benefits - <a href="https://www.europeanscientist.com/en/agriculture/shifting-to-plant-based-diets-crucial-in-fight-against-climate-change/">European Scientist</a></li>

                        <li>Plant based meat alternatives have 90% fewer greenhouse gas emissions than beef - <a href="http://css.umich.edu/sites/default/files/publication/CSS18-10.pdf">Center for Sustainable Systems, university of Michigan</a></li>

                        <li>Eating seasonal foods can simplify complex supply chains and reduce the carbon footprint of our food by up to 4-5% - <a href="https://blogs.ei.columbia.edu/2012/09/04/how-green-is-local-food/" >State of the Planet</a></li>

                        <li>School vegetable gardens is proven to improve academic achievement, promote healthy lifestyles, as well as encouraging community and social development - <a href="https://www.gardenorganic.org.uk/sites/www.gardenorganic.org.uk/files/resources/fflp/FGIS-Final-Full-report.pdf">Food growing in Schools Task Force</a></li>

                        <li>Going plant based could prevent 45,000 excess deaths each year - <a href="https://friendsoftheearth.uk/sites/default/files/downloads/healthy_planet_eating.pdf">Friends of the Earth</a></li>
                    </ol>

                    <Link to="/"><button className="Btn">Go Back</button></Link>
                </div>
            </div>
        </>
    )
}

export default SourcesPage;
