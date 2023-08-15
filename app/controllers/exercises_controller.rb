class ExercisesController < ApplicationController
    def index
        render json: Exercise.all
    end

    def create
        exercise = Exercise.create!(exercise_params)
        render json: exercise, status: :created
    rescue ActiveRecord::RecordInvalid => e 
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def unique_attributes
        render json: Exercise.unique_attributes
    end

    private

    def exercise_params
        params.require(:exercise).permit(:name, :body_part, :target, :equipment, :gif_url)
    end
end
