# Use an official Ruby image as the base image
FROM ruby:2.7.4

# Set the working directory in the container
WORKDIR /app

# Copy the Gemfile and Gemfile.lock from your Rails application into the container
COPY Gemfile Gemfile.lock ./

# Install Node.js and npm for building the front end
RUN apt-get update && apt-get install -y nodejs npm

# Install dependencies using Bundler
RUN bundle install

# Copy the rest of your Rails application into the container
COPY . .

# Build the frontend code
RUN rm -rf public
RUN npm install --prefix client && npm run build --prefix client && rm -rf node_modules
RUN cp -a client/build/. public/

# Run database migrations
RUN bundle exec rake db:migrate
# Uncomment the following line if you have seed data and want to run db:seed during the initial deploy
RUN bundle exec rake db:seed

# Start Redis, Rails, and Sidekiq
CMD ["sh", "-c", "redis-server & bundle exec rails server -b 0.0.0.0 & bundle exec sidekiq"]
