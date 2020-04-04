require 'rails_helper'

describe "posts routes" do
    it "should route to posts index" do
        expect(get 'api/v1/posts').to route_to('posts#index') 
    end

    it "should route to posts show" do
        expect(get 'api/v1/posts/1').to route_to('posts#show', id: '1') 
    end

    it "should route to posts update" do
        expect(put 'api/v1/posts/1').to route_to('posts#update', id: '1') 
    end

    it "should route to posts create" do
        expect(post 'api/v1/posts').to route_to('posts#create') 
    end

    it "should route to posts destroy" do
        expect(delete 'api/v1/posts/1').to route_to('posts#destroy',id: '1') 
    end
end
