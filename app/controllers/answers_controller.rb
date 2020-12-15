class AnswersController < ApiController
  include ActionController::RequestForgeryProtection
  protect_from_forgery except: ['create']

  def index
    @answers = Answer.all
    render json: @answers.to_json
  end

  def create
    @answer = Answer.new(answer_params)

    if @answer.save
      render json: @answer, status: :created
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:name, :category, :description, :guest_id, :column, :game)
  end
end
