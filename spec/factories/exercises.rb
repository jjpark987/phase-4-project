FactoryBot.define do
    factory :exercise, class: Exercise do
        sequence(:id) { |n| n }
        name { 'sample_name' }
        body_part { 'sample_body_part' }
        target { 'sample_target' }
        equipment { 'sample_equipment' }
        sequence(:gif_url) { |n| "sample_url_#{n}" }
        original { true }
    end
end
  