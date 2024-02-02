require 'rails_helper'

describe ReplaceGifUrls, type: :worker do
    before do
        # FactoryBot to build sample test arrays
        api_response = build_list(:api_response, 10)
        @sample_exercises = build_list(:exercise, 10)
        @sample_exercises_result = []

        allow(RestClient).to receive(:get).and_return(api_response.to_json)

        allow_any_instance_of(Exercise).to receive(:update_columns) do |exercise, args|
            if @sample_exercises.include?(exercise)
                exercise['gifUrl'] = args['gifUrl']
                @changed_exercises << exercise
            end
        end

        replace_gif_urls = ReplaceGifUrls.new
        replace_gif_urls.perform
        @id_url_hash = replace_gif_urls.instance_variable_get(:@id_url_hash)
    end
    
    it 'updates the database with new gif urls for original exercises' do
        expect(@id_url_hash).to be_an(Hash)
        expect(@id_url_hash.size).to eq(10)

        @id_url_hash.each do |(id, gifUrl)|
            expect(id).to eq(id)
            expect(gifUrl).to eq("responseUrl#{id}")
        end
    
        @sample_exercises_result.each do |exercise|
            expect(exercise).to have_attribute('id')
            expect(exercise).to have_attribute('name')
            expect(exercise).to have_attribute('body_part')
            expect(exercise).to have_attribute('target')
            expect(exercise).to have_attribute('equipment')
            expect(exercise['original']).to eq(true)
    
            updated_url = @exercises_hash[exercise['id']]
    
            if updated_url
                expect(exercise['gif_url']).to eq(updated_url)
            end
        end
    end
end
