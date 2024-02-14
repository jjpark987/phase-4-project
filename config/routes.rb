require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
    # Users
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    get '/me', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'

    # Exercises
    resources :exercises, only: [:index, :create] do
        collection do
            get 'unique_attributes'
            get 'gifs'
        end
    end

    # Workouts
    resources :workouts, only: [:create, :update, :destroy]

    # Mount Sidekiq for periodic job
    mount Sidekiq::Web => '/sidekiq'

    # Routing logic: fallback requests for React Router.
    # Leave this here to help deploy your app later!
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
