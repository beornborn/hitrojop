Rails.application.routes.draw do
  root to: 'dashboard#index'
  resources :users, only: [:update]
end
