Rails.application.routes.draw do
    # Authentication
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    get '/me', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'

    # Exercises
    resources :exercises, only: [:index, :create]
    get '/exercises/unique_attributes', to: 'exercises#unique_attributes'

    # Workouts
    # DELETED :index SINCE I AM NO LONGER USING THAT CONTROLLER ACTION TO OBTAIN WORKOUTS ARRAY OF OBJECTS
    resources :workouts, only: [:create, :update, :destroy]

    # Routing logic: fallback requests for React Router.
    # Leave this here to help deploy your app later!
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
