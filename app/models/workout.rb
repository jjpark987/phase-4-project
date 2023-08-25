class Workout < ApplicationRecord
    belongs_to :user
    belongs_to :exercise

    before_validation :replace_nil

    validates :day, presence: true

    private

    def replace_nil
        self.sets ||= 0
        self.reps ||= 0
        self.weight ||= 0
        self.duration ||= 0
    end
end
