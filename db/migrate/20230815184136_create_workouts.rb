class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.belongs_to :users, null: false, foreign_key: true
      t.belongs_to :exercises, null: false, foreign_key: true
      t.string :day
      t.string :sets
      t.string :reps
      t.string :weight
      t.string :duration

      t.timestamps
    end
  end
end
