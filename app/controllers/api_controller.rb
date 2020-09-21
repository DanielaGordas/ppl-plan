class ApiController < ActionController::API
	# Method that allows us to store the guest user using the session token
	def guest_user
	  Guest.where(token: guest_token).first_or_create
	end

	private

	def guest_token
	  session[:guest_token] ||= SecureRandom.uuid
	end
end