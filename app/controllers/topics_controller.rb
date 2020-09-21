class TopicsController < ApiController
	# GET /topics
  def index
    @topics = Topic.select("id, title", "description").all
    render json: @topics.to_json
  end

  # GET /topic/:id
  def show
    @topic = Topic.find(params[:id])
    render json: @topic.to_json(:include => { :questions => { :only => [:id, :title] }})
  end
end