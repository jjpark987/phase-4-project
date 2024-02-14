require_relative '../config/environment'

def store_gif_blob_for_all_exercises
    Exercise.all.each do |exercise|
        begin
            if !exercise.gif.attached?
                downloaded_gif = URI.open(exercise.gif_url)
                exercise.gif.attach(io: downloaded_gif, filename: "#{exercise.name}_gif.gif")
                puts "Successfully attached gif for #{exercise.name}"
            else
                puts "Skipped #{exercise.name}"
            end
        rescue StandardError => e
            puts "Error attaching gif for #{exercise.name}: #{e.message}"
        end
    end
end

store_gif_blob_for_all_exercises
