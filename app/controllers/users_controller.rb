class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def create
        render json: User.create!(user_params), status: :created
    end

    private

    def record_invalid e 
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
