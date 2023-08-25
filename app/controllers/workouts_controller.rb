class WorkoutsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    # get '/workouts'
    def index
        render json: Workout.where(user_id: session[:user_id])
    end

    # post '/workouts'
    def create
        render json: Workout.create!(user_id: session[:user_id], **workout_params), status: :created
    end

    # patch '/workouts/:id'
    def update
        workout = Workout.find_by!(user_id: session[:user_id], id: params[:id])
        workout.update!(workout_params)
        render json: workout, status: :accepted
    end

    # delete '/workouts/:id'
    def destroy
        workout = Workout.find_by!(user_id: session[:user_id], id: params[:id])
        workout.destroy
        head :no_content
    end
    
    private

    def workout_params
        params.require(:workout).permit(:exercise_id, :day, :sets, :reps, :weight, :duration)
    end

    def record_not_found
        render json: { error: ['Workout not found'] }, status: :not_found
    end

    def record_invalid e
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end
end
