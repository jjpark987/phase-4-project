#!/usr/bin/env bash

echo 'Running render-build.sh...'
# exit on error
set -e

# verbose mode
set -x

# builds the front end code
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

# builds the back end code
bundle install
bundle exec rake db:migrate
bundle exec rake db:seed

# Attaches :gif to each exercise
ruby bin/store_gif_blobs.rb

echo '...finished running render-build.sh'
