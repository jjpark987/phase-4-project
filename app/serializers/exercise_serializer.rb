class ExerciseSerializer < ActiveModel::Serializer
    attributes :id, :name, :body_part, :target, :equipment, :gif_url, :original_id

    def name
        object.name.capitalize
    end

    def body_part
        object.body_part.capitalize
    end

    def target
        object.target.capitalize
    end

    def equipment
        object.equipment.capitalize
    end
end
