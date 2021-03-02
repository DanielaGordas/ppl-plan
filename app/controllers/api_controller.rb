class ApiController < ActionController::API
	before_action :authenticate_admin_user!
	# Method that allows us to store the guest user using the session token
	before_action :authenticate_admin_user!

	def guest_user
	  Guest.where(token: guest_token).first_or_create
	end

	private

	def guest_token
	  session[:guest_token] ||= SecureRandom.uuid
	end
end