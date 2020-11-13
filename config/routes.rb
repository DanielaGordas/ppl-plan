Rails.application.routes.draw do
  get 'guest_answers/create'
  get 'answers/index'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
    resources :guests, only: [:index, :show, :create, :update]
    resources :topics, only: [:index, :show]
    resources :games, only: [:index, :show] do 
      resources :answers, only: [:index]
    end
    resources :answers, only: [:index, :show]
    resources :guest_answers, only: [:index, :create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
