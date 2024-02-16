require_relative '../config/environment'

def store_gif_blobs
    Exercise.all.each do |exercise|
        begin
            downloaded_gif = URI.open(exercise.gif_url)
            image = MiniMagick::Image.read(downloaded_gif)
            image.resize "60%"
            resized_gif_io = StringIO.new(image.to_blob)
            exercise.gif.attach(io: resized_gif_io, filename: "#{exercise.name}_gif.gif")
            puts "Successfully attached gif for #{exercise.name}"
        rescue StandardError => e
            puts "Error attaching gif for #{exercise.name}: #{e.message}"
        end
    end
end

store_gif_blobs
