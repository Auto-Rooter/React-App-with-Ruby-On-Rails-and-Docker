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

    describe "#show" do
        let(:post1) { create :post}
        subject { get :show, params: { id: post1.id }}

        it 'should return success response' do
            subject
            expect(response).to have_http_status(:ok) 
        end

        it 'should return proper json' do
            subject
            expect(json).to eq({
                "id" => post1.id,
                "updated_at" => post1.updated_at.to_s.split(' ')[0],
                "title" => post1.title,
                "description" => post1.description,
                "comments" => [],
                "image" => nil
                })
        end
    end

    describe "#create" do

        let(:valid_attributes)  {{ 'title' => 'My Hilarious title', 'description' => 'Again my booring description go here' }} 

        let(:invalid_attributes) {{ 'title' => '', 'description' => ''}}

        context "When valid parameters" do
            subject { post :create, params: valid_attributes }

            it "should have 201 status code" do
                subject 
                expect(response).to have_http_status(:created) 
            end

            it "should return proper json body" do 
                subject 
                expect(json[0]['title']).to eq(valid_attributes["title"])
                expect(json[0]['description']).to eq(valid_attributes["description"])
            end

            it "should create the post" do
                expect { subject }.to change{ Post.count }.by(1)
            end
        end

        context "When invalid parameters" do
            subject { post :create, params: invalid_attributes }

            it "should have 422 status code" do
                subject 
                expect(response).to have_http_status(:unprocessable_entity)
            end

            it "should return proper error" do
                subject 
                expect(json["title"]).to include("can't be blank")
                expect(json["description"]).to include("can't be blank")
            end
        end
  
    end


    describe "#update" do
        let(:post1) { create :post }

        let(:valid_attributes)  {{ 'title' => 'My Hilarious title', 'description' => 'Again my booring description go here' }} 

        let(:invalid_attributes) {{ 'title' => '', 'description' => ''}}

        context "When valid parameters" do

            subject do
                put :update, params: valid_attributes.merge(id: post1.id) 
            end

            it "should have 200 status" do
                subject 
                expect(response).to have_http_status(:ok)
            end

            it "should have proper json body" do 
                subject
                expect(json["title"]).to eq(valid_attributes["title"])
                expect(json["description"]).to eq(valid_attributes["description"])
            end

            it "should update the post" do
                subject 
                expect(post1.reload.title).to eq( valid_attributes["title"])
                expect(post1.reload.description).to eq( valid_attributes["description"])
            end
        end

        context "When invalid parameters" do
            subject do
                put :update, params: invalid_attributes.merge(id: post1.id) 
            end

            it "should have 422 status code" do
                subject
                expect(response).to have_http_status(:unprocessable_entity)
            end

            it "should return proper error" do
                subject 
                expect(json["title"]).to include("can't be blank")
                expect(json["description"]).to include("can't be blank")
            end
        end
    end

    describe "#destroy" do
        let(:post1) { create :post }

        subject { delete :destroy, params: {id: post1.id}}

        it "should have 204 status code" do 
            subject
            expect(response).to have_http_status(:no_content)
        end

        it "should return empty json body" do
            subject
            expect(response.body).to eq("{}")
        end

        it "should destroy the post" do
            post1
            expect{ subject }.to change{ Post.count }.by(-1)
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
