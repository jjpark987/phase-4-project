require_relative '../config/environment'

def store_gif_blobs
    Exercise.all.each do |exercise|
        begin
            downloaded_gif = URI.open(exercise.gif_url)
            exercise.gif.attach(io: downloaded_gif, filename: "#{exercise.name}_gif.gif")
            puts "Successfully attached gif for #{exercise.name}"
        rescue StandardError => e
            puts "Error attaching gif for #{exercise.name}: #{e.message}"
        end
    end
end

store_gif_blobs
