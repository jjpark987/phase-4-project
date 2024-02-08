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

# Run the render-build.sh script to build the front end and back end code
RUN chmod a+x bin/render-build.sh
RUN bin/render-build.sh

# Start Redis, Rails, and Sidekiq
CMD ["sh", "-c", "redis-server & bundle exec rails server -b 0.0.0.0 & bundle exec sidekiq"]
