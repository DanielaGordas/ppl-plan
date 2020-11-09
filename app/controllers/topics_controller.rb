class TopicsController < ApiController
	# GET api/topics
  def index
    @topics = Topic.all
    render json: @topics.to_json
  end

  # GET api/topic/:id
  def show
    @topic = Topic.find(params[:id])
    render json: @topic.to_json(:include => { :game => { :only => [:id, :name, :description, :instructions] }})
  end

end