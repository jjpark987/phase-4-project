class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email
    # ADDED has_many :workouts TO RENDER WORKOUTS ARRAY OF OBJECTS NESTED UNDER USER OBJECT
    has_many :workouts
end
