class SessionsController < ApplicationController
    # post '/login'
    def create
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { error: ['Invalid email or password'] }, status: :unauthorized
        end
    end

    # delete '/logout'
    def destroy
        session.delete :user_id
        head :no_content
    end
end
