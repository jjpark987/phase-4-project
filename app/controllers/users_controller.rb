class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    # get '/me'
    def show
        render json: User.find_by!(id: session[:user_id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: ['Not authorized'] }, status: :unauthorized
    end

    # post '/signup'
    def create
        render json: User.create!(user_params), status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
