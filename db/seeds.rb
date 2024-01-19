# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
require 'rest-client'

puts 'Seeding exercises from ExerciseDB...'

response = RestClient.get 'https://exercisedb.p.rapidapi.com/exercises', {
    'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
}

exercises = JSON.parse(response)

exercises.each do |exercise|
    Exercise.create(
        name: exercise['name'], 
        body_part: exercise['bodyPart'], 
        target: exercise['target'],
        equipment: exercise['equipment'],
        gif_url: exercise['gifUrl']
    )
end

puts 'Done seeding exercises'

# puts 'Seeding 50 workouts...'

# days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

# 10.times do
#     Workout.create(
#         user_id: 1,
#         exercise_id: rand(1..1324),
#         day: days.sample,
#         sets: rand(4..8),
#         reps: rand(6..12),
#         weight: rand(5..100),
#         duration: nil
#     )
# end

# puts 'Done seeding workouts'
