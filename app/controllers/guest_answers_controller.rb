class GuestAnswersController < ApiController
  include ActionController::RequestForgeryProtection
  protect_from_forgery except: ['create']

  def index
    @guest_answer = GuestAnswer.all
    render json: @guest_answer
  end
  
  def create
    @guest_answer = GuestAnswer.new(guest_answer_params)

    if @guest_answer.save
      render json: @guest_answer, status: :created
    else
      render json: @guest_answer.errors, status: :unprocessable_entity
    end
  end

  private

  def guest_answer_params
    params.require(:guest_answer).permit(:answer_id, :guest_id)
  end
end
