class Workout < ApplicationRecord
    belongs_to :user
    belongs_to :exercise

    before_validation :replace_nil

    validates :day, presence: true
    validates :sets, :reps, :weight, :duration, numericality: true
    validate :sets_reps_or_duration_present
    validate :validate_day_limit

    private

    def replace_nil
        self.sets ||= 0
        self.reps ||= 0
        self.weight ||= 0
        self.duration ||= 0
    end

    def sets_reps_or_duration_present
        if ((self.sets == 0 || self.reps == 0) && self.duration == 0) || self.sets != 0 && self.reps != 0 && self.duration != 0
            errors.add(:base, "Must have either sets and reps OR duration")
        end
    end

    def validate_day_limit
        if Workout.where(day: day).count >= 8
            errors.add(:base, 'You can only add 8 workouts to a day.')
        end
    end
end
