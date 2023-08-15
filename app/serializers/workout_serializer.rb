class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :day, :sets, :reps, :weight
  has_one :users
  has_one :exercises
end
