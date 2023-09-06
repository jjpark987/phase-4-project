class WorkoutSerializer < ActiveModel::Serializer
    attributes :id, :day, :sets, :reps, :weight, :duration, :exercise

    def exercise
        {
            id: object.exercise.id,
            name: object.exercise.name.capitalize,
            body_part: object.exercise.body_part.capitalize,
            target: object.exercise.target.capitalize,
            equipment: object.exercise.equipment.capitalize,
            gif_url: object.exercise.gif_url
        }
    end
end
