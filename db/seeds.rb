# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Creating admin users!"

AdminUser.create!(email: 'dana@gmail.com', password: 'password', password_confirmation: 'password')

puts "Creating topics and questions"

topic1 = Topic.create(title: "Low Carbon Travel", description: "Investment in cycle lanes will encourage cycling and improve public health. Electrifying the public transport network and installing vehicle charging stations across the UK will enable a transition to electric travel.The transition to electric cars, buses and lorries would reduce the UK’s greenhouse gas emissions by a fifth, and electrifying the rail network will reduce rail CO2 emissions by 60%. A National Cycle Network would boost the economy by £5 billion per year by 2040.")

topic1.questions.create(title: "Is your local area doing enough to make these solutions happen?")
topic1.questions.create(title: "Would you sign up to a bike sharing service?")
topic1.questions.create(title: "Would you sign up to an electric car sharing service?")
topic1.questions.create(title: "If [your location] had electric buses this would reduce maintenance costs and make the service more reliable.  Would you use electric busses and trains than your current usage")


topic2 = Topic.create(title: "Sustainable Food System", description: "We need healthy and affordable food. A sustainable food system will prove resilient to future crises, promote biodiversity, and protect profits for farmers. Better labelling will help us make informed choices, understand the food we are eating and reduce food waste. More powerful and resilient strong local food economies that can withstand political and environmental challenges. Transforming our food system along these lines will lower our carbon footprint and restore our natural ecosystems, whilst guaranteeing greater food security and fair economic returns for producers.")

topic2.questions.create(title:"Do you think food should include carbon emissions on it’s labelling?")
topic2.questions.create(title:"Would this influence what products you buy?")
topic2.questions.create(title:"Would you support a household food waste collection fee? Food waste under a certain weight is free, once you go over, you have to pay more in council tax, to incentivise lower waste?")
topic2.questions.create(title:"Should councils help farmers transition to more environmentally friendly farming practices? What do you think this would look like?")

puts "Finished!"