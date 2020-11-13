# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# puts "Creating admin users!"

# AdminUser.create!(email: 'dana@gmail.com', password: 'password', password_confirmation: 'password')

puts "Populating DB"

game1 = Game.create!(name: "Low Carbon Travel", description: "You’re stuck in traffic again on your daily commute, you start daydreaming of what the future of transport could be like.", instructions: "You can select 5 out of 11 options. 6 of the options are for a more car focused future, 5 are for a more public transit future.")

answer1 = Answer.create!(game_id: game1.id, title: "EV charging points", category: "Electric car ownership", description: "Invest in a network of car charging stations, with fast chargers every 50km along motorways, and provide better subsidies for home charging points.")
answer2 = Answer.create(game_id: game1.id, title: "Employer car sharing schemes", category: "Electric car ownership", description: "Reduce pollution, reduce the demand for car parking spaces by 50%, and employees could save up to £1000 on fuel and vehicle running costs.")
answer3 = Answer.create(game_id: game1.id, title: "Old car scrappage scheme", category: "Electric car ownership", description: "Giving car owners money towards an electric vehicle when they scrap their old polluting vehicle, will boost the UK’s car manufacturing industry and improve air pollution.")
answer4 = Answer.create(game_id: game1.id, title: "Tax Benefits", category: "Electric car ownership", description: "Increase tax benefits, including purchase tax and VAT, for individuals and businesses looking to purchase new electric vehicles.")
answer5 = Answer.create(game_id: game1.id, title: "Purchase Grants", category: "Electric car ownership", description: "Introduce Purchase Grants to make electric vehicles more financially available to low income households.")
answer6 = Answer.create(game_id: game1.id, title: "Electric bus network", category: "Mass transit", description: "Electrifying the public bus network will improve local air quality and public health.")
answer7 = Answer.create(game_id: game1.id, title: "Electric rail network", category: "Mass transit", description: "This will boost the economy by potentially doubling the number of jobs in this sector, as well as saving money on maintenance and running costs.")
answer8 = Answer.create(game_id: game1.id, title: "Cycling network", category: "Mass transit", description: "Invest in a National Cycle Network with dedicated city cycle lanes, making it safer for cyclists and improving public health as a result of regular exercise and cleaner air.")
answer9 = Answer.create(game_id: game1.id, title: "Car-free zones", category: "Mass transit", description: "Car-free school zones and residential areas make it safer for children to walk and cycle to school.")
answer10 = Answer.create(game_id: game1.id, title: "Improved public transport services", category: "Mass transit", description: "Making public transport options more efficient and reliable than current options.")

puts "Finished!"