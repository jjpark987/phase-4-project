source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.3"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 7.1', '>= 7.1.3'

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.5', '>= 1.5.4'

# Use Puma as the app server
gem 'puma', '~> 6.4', '>= 6.4.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '~> 1.18', '>= 1.18.3', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors', '~> 2.0', '>= 2.0.1'

# Make HTTP requests to RESTful API
gem 'rest-client', '~> 2.1'

# Easy-to-use wrapper for Net::HTTP, Net::HTTPS, and Net::FTP
gem 'open-uri', '~> 0.4.1'

# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1', '>= 3.1.20'

# ActiveModel::Serializers
gem 'active_model_serializers', '~> 0.10.14'

# Offers tools for processing and manipulating images attached via Active Storage
gem 'image_processing', '~> 1.12', '>= 1.12.2'

# Loads ENV
gem 'dotenv-rails', '~> 3.0'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', '~> 1.2024', '>= 1.2024.1'

# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 5.1'

# For periodic jobs
gem "sidekiq", "~> 7.2"
gem "sidekiq-cron", "~> 1.12"
gem "sidekiq-scheduler", "~> 5.0"

group :development, :test do
  gem 'byebug', '~> 11.1', '>= 11.1.3'
  gem 'rspec-rails', '~> 6.1', '>= 6.1.1'
end

group :development do
  # Listens to file modifications and notifies about changes
  gem 'listen', '~> 3.8'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '~> 4.1', '>= 4.1.3'
end

group :test do
  # json API responses
  gem 'rspec-json_expectations', '~> 2.2'
  # Improves RSpec
  gem 'shoulda-matchers', '~> 6.1'
end
