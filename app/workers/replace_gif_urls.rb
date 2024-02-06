class ReplaceGifUrls
    include Sidekiq::Worker

    def perform
        Rails.logger.info "Started ReplaceGifUrls at #{Time.now}..."

        response = RestClient.get 'https://exercisedb.p.rapidapi.com/exercises', {
            'X-RapidAPI-Key': ENV['RAPIDAPI_KEY'],
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }

        Rails.logger.info "response.code: #{response.code}"
        Rails.logger.info "response.body: #{response.body}"

        @id_url_hash = JSON.parse(response).each_with_object({}) do |exercise, hash|
            hash[exercise['id']] = exercise['gifUrl']
        end

        Exercise.where.not(original_id: nil).each do |exercise|
            updated_gif = @id_url_hash[exercise['original_id']]

            if updated_gif
                exercise.update_columns(gif_url: updated_gif)
            end
        end

        Rails.logger.info '...finished ReplaceGifUrls'
    end
end
