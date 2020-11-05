class GuestsController < ApiController
    def index
        @guests = Guest.all
        render json: @guests
    end
     
    def create
        @guest = guest_user
        @guest.update(guest_params)

        if @guest.save
            render json: @guest, status: :created
        else
            render json: @guest.errors, status: :unprocessable_entity
        end
    end

    private

    def guest_params
      params.require(:guest).permit(:age, :gender, :postal_code)
    end
end