class WorkoutsController < ApplicationController
    # post '/workouts'
    def create
        render json: Workout.create!(workout_params), status: :created
    rescue ActiveRecord::RecordInvalid => e 
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    private

    def workout_params
        params.require(:workout).permit(:user_id, :exercise_id, :day, :sets, :reps, :weight, :duration)
    end
end
