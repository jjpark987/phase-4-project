class ExercisesController < ApplicationController
    def index
        render json: Exercise.all
    end
end
