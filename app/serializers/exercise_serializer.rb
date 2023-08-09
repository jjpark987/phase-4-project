class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :body_part, :target, :equipment, :gif_url
end
