class User < ApplicationRecord
    has_many :workouts, dependent: :destroy
    has_many :exercises, through: :workouts

    has_secure_password
    
    validates :first_name, :email, :username, presence: true
    validates :email, :username, uniqueness: true
    validates :email, format: { 
        with: /\A[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\z/, 
        message: "is not in the correct format." 
    }
end
