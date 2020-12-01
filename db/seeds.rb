puts "Creating admin users!"

AdminUser.create!(email: 'dana@gmail.com', password: 'password', password_confirmation: 'password')

puts "Populating DB"

game1 = Game.create!(name: "Low Carbon Travel", description: "You’re stuck in traffic on your way to work again and daydreaming of a future where UK commuters don’t waste 115 hours sitting in traffic annually. What does that future look like?
", instructions: "Choose 5 of the 11 low carbon travel options to shape the future of transport by dragging them onto the scale, below. The gauge will indicate whether your future commute will be improved by individual electric vehicles or more efficient public transport services.")

answer1 = Answer.create!(game_id: game1.id, title: "EV charging points", category: "Electric car ownership", description: "Invest in a network of car charging stations, with fast chargers every 50km along motorways, and provide better subsidies for home charging points.")

answer2 = Answer.create(game_id: game1.id, title: "Work based car sharing scheme", category: "Electric car ownership", description: "Employees carpooling could save up to £1000 on fuel and vehicle running costs, reduce pollution, and reduce demand for car parking spaces by 50%.")

answer3 = Answer.create(game_id: game1.id, title: "Car scrappage scheme", category: "Electric car ownership", description: "Individuals receive money towards an electric vehicle for scrapping their old polluting car, which will boost the UK’s car manufacturing industry, reduce air pollution and reduce emissions.")

answer4 = Answer.create(game_id: game1.id, title: "Tax Benefits", category: "Electric car ownership", description: "Make new electric vehicles more affordable for individuals and businesses by increasing benefits, such as purchase tax and VAT.")

answer5 = Answer.create(game_id: game1.id, title: "Purchase Grants", category: "Electric car ownership", description: "Introduce Purchase Grants to give people money to buy electric vehicles, making them more financially accessible to low income households.")

answer6 = Answer.create(game_id: game1.id, title: "Electric bus network", category: "Mass transit", description: "Electrify the bus network resulting in cheaper and more reliable public transport, as well as improvements in local air quality and public health.")

answer7 = Answer.create(game_id: game1.id, title: "Electric rail network", category: "Mass transit", description: "Enjoy smoother, quieter, more reliable journeys with an electrified rail network. Boost the economy by potentially doubling the number of jobs in this sector, as well as saving money on maintenance and running costs.")

answer8 = Answer.create(game_id: game1.id, title: "National Cycling network", category: "Mass transit", description: "Boost the economy by £5 million annually by investing in a National Cycle Network with dedicated city cycle lanes, making it safer for cyclists and improving public health as a result of regular exercise and cleaner air.")

answer9 = Answer.create(game_id: game1.id, title: "Car-free zones", category: "Mass transit", description: "Car-free school zones and residential areas make it safer for children to walk and cycle to school, while reducing congestion and air pollution and improving public health.")

answer10 = Answer.create(game_id: game1.id, title: "Improve public existing public transport", category: "Mass transit", description: "Improve public transport efficiency and reliability by optimising bus routes and reclaiming roads for dedicated bus/tram lanes in cities.")

puts "Finished!"