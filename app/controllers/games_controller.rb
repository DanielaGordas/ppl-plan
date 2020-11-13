class GamesController < ApiController
  
  # GET api/games
  def index
    @games = Game.all
    render json: @games.to_json
  end
  # GET api/games/:id
  def show
    @game = Game.find(params[:id])
    render json: @game.to_json(:include => { :answers => { :only => [:id, :title, :category, :description] }})
  end
end
