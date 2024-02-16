require_relative '../config/environment'

def store_gif_blobs
    Exercise.all.each do |exercise|
        begin
            downloaded_gif = URI.open(exercise.gif_url)

            processed_gif = ImageProcessing::MiniMagick.source(downloaded_gif).resize_to_fit(5, 5)

            exercise.gif.attach(io: downloaded_gif, filename: "#{exercise.name}_gif.gif")
            puts "Successfully attached gif for #{exercise.name}"
        rescue StandardError => e
            puts "Error attaching gif for #{exercise.name}: #{e.message}"
        end
    end
end

store_gif_blobs
