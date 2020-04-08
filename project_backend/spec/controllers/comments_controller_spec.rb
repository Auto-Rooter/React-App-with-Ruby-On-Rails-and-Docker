require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  
  let(:post1) { create :post }

  describe "POST #create" do

      let(:valid_attributes)  { {comment: 'My awesome comment for this Post '}} 

      let(:invalid_attributes) { {comment: '' }}


      context "with valid parameters" do

          subject do
              post :create, params: valid_attributes.merge(post_id: post1.id)
          end

          it 'returns 201 status code' do
            subject
            expect(response).to have_http_status(:created)
          end

          it "creates a new Comment" do
            expect { subject }.to change(post1.comments, :count).by(1)
          end

      end



      context "with invalid parameters" do

        subject do
          post :create, params: invalid_attributes.merge(post_id: post1.id)
        end

        it 'should return 422 status code' do
          subject
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "should return proper error" do
          subject 
          expect(json["comment"]).to include("can't be blank")
      end

      end
    

  end


  describe "DELETE #destroy" do
    let(:post1) { create :post}
    let(:comment) { create :comment, post: post1 }

    context "with valid parameters" do

        subject do
            delete :destroy, params: { id: comment.id}
        end

        it 'should returns 204 status code' do
          subject
          expect(response).to have_http_status(:no_content)
        end

        it 'should have empty json body' do
          subject
          expect(response.body).to eq("{}")
        end

        it 'should destroy the comment' do
          comment
          expect{ subject }.to change{ post1.comments.count }.by(-1)
        end

    end

end

end