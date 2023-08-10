class Exercise < ApplicationRecord
    before_validation :update_equipments
    validates :name, :body_part, :target, :equipment, presence: true
    validates :name, uniqueness: true

    private

    def update_equipments
        self.equipment = 'none' if equipment == 'body weight' || equipment == 'assisted'
    end
end
