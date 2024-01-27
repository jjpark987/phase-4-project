class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :body_part
      t.string :target
      t.string :equipment
      t.string :gif_url
      t.boolean :original
    end
  end
end
