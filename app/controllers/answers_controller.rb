class AnswersController < ApplicationController
  def index
    @game = Game.find(params[:game_id])
    @answers = @game.answers
    render json: @answers.to_json
  end
end
