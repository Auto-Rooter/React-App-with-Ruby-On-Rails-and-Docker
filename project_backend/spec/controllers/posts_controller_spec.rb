require 'rails_helper'

RSpec.describe PostsController, type: :controller do
    describe "#index" do
        subject { get :index } 
        it 'should return success response' do
            subject
            expect(response).to have_http_status(:ok)
        end

        it 'should return proper body' do
            create_list :post, 5
            subject
            Post.recent.each_with_index do |post, index|
                expect(json[index]['title']).to eq(post.title)
                expect(json[index]['description']).to eq(post.description)    
            end
        end  
    end


    
end


# 200  :ok                    => success msg for GET requests
# 201  :created               => resource successfully created
# 204  :no_content            => usually for update & destroy actions
# 401  :not_authorized        => no authentication or invalid one 
# 403  :forbidden             => one has no permission for this actions
# 404  :not_found             => the requested resource cant be found
# 422  :unprocessable_entity  => the processed resource is invalid
