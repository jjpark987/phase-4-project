# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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
        gif_url: exercise['gifUrl'],
        original: true
    )
end

puts '...done seeding exercises'
