# Use an official Ruby image as the base image
FROM ruby:2.7.4

# Set the working directory in the container
WORKDIR /app

# Copy the Gemfile and Gemfile.lock from your Rails application into the container
COPY Gemfile Gemfile.lock ./

# Install dependencies using Bundler
RUN bundle install

# Copy the rest of your Rails application into the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Rails server when the container starts
CMD ["rails", "server", "-b", "0.0.0.0"]
