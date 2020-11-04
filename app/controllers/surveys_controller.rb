class SurveysController < ApiController

	def index
	  @surveys = Survey.select("id").all
	  render json: @surveys.to_json
	end

	def show
		@survey = Survey.find(params[:id])
		render json: @survey.to_json(:include => { :topics => { :only => [:id, :description] }})
	end

	# To be implemented once we have the app flow
	def create
		@guest = guest_user
	end

end
