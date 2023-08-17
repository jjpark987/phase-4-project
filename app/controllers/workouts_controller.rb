class WorkoutsController < ApplicationController
    # get '/workouts'
    def index
        render json: Workout.where(user_id: session[:user_id])
    end

    # post '/workouts'
    def create
        render json: Workout.create!(user_id: session[:user_id], **workout_params), status: :created
    rescue ActiveRecord::RecordInvalid => e 
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    private

    def workout_params
        params.require(:workout).permit(:exercise_id, :day, :sets, :reps, :weight, :duration)
    end
end
