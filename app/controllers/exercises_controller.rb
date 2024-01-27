class ExercisesController < ApplicationController
    skip_before_action :authorize, only: [:index, :unique_attributes]
    
    # get '/exercises'
    def index
        render json: Exercise.all
    end

    # post '/exercises'
    def create
        render json: Exercise.create!(exercise_params), status: :created
    rescue ActiveRecord::RecordInvalid => e 
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    # get 'exercises/unique_attributes'
    def unique_attributes
        attributes = Exercise.unique_attributes
        formatted_attributes = {
          body_parts: attributes[:body_parts].map(&:capitalize).sort,
          targets: attributes[:targets].map(&:capitalize).sort,
          equipments: attributes[:equipments].map(&:capitalize).sort
        }
        render json: formatted_attributes
    end

    private

    def exercise_params
        params.require(:exercise).permit(:name, :body_part, :target, :equipment, :gif_url, :original)
    end
end
