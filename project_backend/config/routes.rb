Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      resources :posts
      get 'triangle', to: 'triangles#check'
      resources :comments
    end
  end
end
