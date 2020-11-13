class TopicsController < ApiController
	# GET api/topics
  def index
    @topics = Topic.select("id, title, description").all
    render json: @topics.to_json(:include => { :game => { :only => [:id, :name, :description, :instructions] }})
  end
  
  # GET api/topic/:id
  def show
    @topic = Topic.find(params[:id])
    render json: @topic.to_json(:include => { :game => { :only => [:id, :name, :description, :instructions] }})
  end

end