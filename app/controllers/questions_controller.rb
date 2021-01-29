class QuestionsController < ApiController
    include ActionController::RequestForgeryProtection
    protect_from_forgery except: ['create']

    def index
        @questions = Question.all
        render json: @questions.to_json
      end
    
      def create
        @question = Question.new(question_params)
    
        if @question.save
          render json: @question, status: :created
        else
          render json: @question.errors, status: :unprocessable_entity
        end
      end
    
      private
    
      def question_params
        params.require(:question).permit(:answer, :question, :guest_id)
      end
end
