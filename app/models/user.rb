class User < ApplicationRecord
    has_many :workouts, dependent: :destroy
    has_many :exercises, through: :workouts

    has_secure_password
    
    validates :first_name, :last_name, :email, presence: true
    validates :email, uniqueness: true
end
