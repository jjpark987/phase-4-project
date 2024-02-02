class ApiResponse 
    attr_accessor :id, :name, :bodyPart, :target, :equipment, :gifUrl
end

FactoryBot.define do
    factory :api_response do
        sequence(:id) { |n| n }
        name { 'responseName' }
        bodyPart { 'responseBodyPart' }
        target { 'responseTarget' }
        equipment { 'responseEquipment' }
        sequence(:gifUrl) { |n| "responseUrl#{n}" }
    end
  end
  