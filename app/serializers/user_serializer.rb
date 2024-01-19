class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :email, :username

    has_many :workouts
    has_many :exercises, through: :workouts

    def exercises
        object.exercises.uniq.map do |exercise| 
            {
                id: exercise.id,
                name: exercise.name.capitalize,
                body_part: exercise.body_part.capitalize,
                target: exercise.target.capitalize,
                equipment: exercise.equipment.capitalize,
                gif_url: exercise.gif_url
            }
        end
    end
end
