class Workout < ApplicationRecord
  belongs_to :user
  belongs_to :exercise

  validates :day, presence: true
end
