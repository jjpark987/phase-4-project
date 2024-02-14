class ExercisesController < ApplicationController
    skip_before_action :authorize, only: [:index, :unique_attributes, :gifs]
    
    # get '/exercises'
    def index
        render json: Exercise.all
    end

    # post '/exercises'
    def create
        exercise = Exercise.new(exercise_params)

        if params[:exercise][:gif_url].present?
            downloaded_gif = URI.open(params[:exercise][:gif_url])
            exercise.gif.attach(io: downloaded_gif, filename: "#{exercise.name.downcase}_gif.gif")
        end

        exercise.save!

        gif_blob_url = "#{request.base_url}/rails/active_storage/blobs/#{exercise.gif_blob.key}"

        render json: { exercise: exercise, gif_blob_url: gif_blob_url }, status: :created
    rescue ActiveRecord::RecordInvalid => e 
        render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    # get '/exercises/unique_attributes'
    def unique_attributes
        attributes = Exercise.unique_attributes
        
        formatted_attributes = {
            body_parts: attributes[:body_parts].map(&:capitalize).sort,
            targets: attributes[:targets].map(&:capitalize).sort,
            equipments: attributes[:equipments].map(&:capitalize).sort
        }

        render json: formatted_attributes
    end

    # get '/exercises/gifs'
    def gifs
        gifs_hash = {}
      
        Exercise.includes(:gif_blob).each do |exercise|
            gif_blob = exercise.gif.blob
            if gif_blob
                gifs_hash[exercise.id] = rails_blob_path(gif_blob)
            end
        end
      
        render json: gifs_hash
    end

    private

    def exercise_params
        params.require(:exercise).permit(:name, :body_part, :target, :equipment, :gif_url, :original_id)
    end
end
