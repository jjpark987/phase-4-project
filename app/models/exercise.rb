class Exercise < ApplicationRecord
    has_many :workouts
    has_many :users, through: :workouts

    before_validation :lowercase_all, :remove_parentheses, :update_equipments
    
    validates :name, :body_part, :target, :equipment, presence: true
    validates :name, uniqueness: true

    def self.unique_attributes
        {
            body_parts: distinct.pluck(:body_part), 
            targets: distinct.pluck(:target), 
            equipments: distinct.pluck(:equipment) 
        }
    end

    private

    def lowercase_all
        self.name = name.downcase
        self.body_part = body_part.downcase
        self.target = target.downcase
        self.equipment = equipment.downcase
    end

    def remove_parentheses
        if self.name.include?('(') && self.name.include?(')')
            self.name.slice!(self.name.index('(')..self.name.index(')'))
        end
    end

    def update_equipments
        self.equipment = 'none' if equipment == 'body weight' || equipment == 'assisted'
    end
end
