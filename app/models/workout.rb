class Workout < ApplicationRecord
  belongs_to :users
  belongs_to :exercises
end
