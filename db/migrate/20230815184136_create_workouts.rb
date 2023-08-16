class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :exercise, null: false, foreign_key: true
      t.string :day
      t.integer :sets
      t.integer :reps
      t.integer :weight
      t.integer :duration

      t.timestamps
    end
  end
end
