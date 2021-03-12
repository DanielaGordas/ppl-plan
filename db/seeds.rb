puts "Creating admin users!"

AdminUser.create!(email: 'dana@gmail.com', password: 'password', password_confirmation: 'password')

puts "Finished!"