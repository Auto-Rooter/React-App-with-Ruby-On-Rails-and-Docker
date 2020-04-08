require 'rails_helper'

describe "comments routes" do

    it "should route to comments create" do
        expect(post 'api/v1/comments').to route_to('comments#create') 
    end


    it "should route to comments destroy" do
        expect(delete 'api/v1/comments/1').to route_to('comments#destroy',id: '1') 
    end
end
