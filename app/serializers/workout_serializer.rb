class WorkoutSerializer < ActiveModel::Serializer
    attributes :id, :day, :sets, :reps, :weight, :duration

    has_one :user
    has_one :exercise
end
