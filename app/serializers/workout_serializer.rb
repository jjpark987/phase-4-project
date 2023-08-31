class WorkoutSerializer < ActiveModel::Serializer
    attributes :id, :day, :sets, :reps, :weight, :duration, :exercise

    def exercise
        object.exercise.attributes.merge(name: object.exercise.name.capitalize)
    end
end
