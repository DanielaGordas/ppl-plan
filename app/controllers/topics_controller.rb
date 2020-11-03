class TopicsController < ApiController
	# GET api/topics
  def index
    @topics = Topic.select("id, title", "description").all
    render json: @topics.to_json
  end

  # GET api/topic/:id
  def show
    @topic = Topic.find(params[:id])
    render json: @topic.to_json(:include => { :questions => { :only => [:id, :title] }})
  end
end