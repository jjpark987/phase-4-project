class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email

    has_many :workouts
    has_many :exercises, through: :workouts

    def exercises
        object.exercises.uniq
    end
end
