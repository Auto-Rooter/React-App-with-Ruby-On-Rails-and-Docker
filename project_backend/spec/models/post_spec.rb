require 'rails_helper'

RSpec.describe Post, type: :model do
    describe "#validations" do
        it 'should test that the factory is valid' do
            expect(build :post).to be_valid
        end

        it 'should validate the presence of the title' do
            post = build :post, title: ''
            expect(post).not_to be_valid
            expect(post.errors.messages[:title]).to include("can't be blank")
        end

        it 'should validate the presence of the description' do
            post = build :post, description: ''
            expect(post).not_to be_valid
            expect(post.errors.messages[:description]).to include("can't be blank")
        end
    end

    describe ".recent" do
        it "should list recent post first" do
            old_post = create :post
            newer_post = create :post
            expect(described_class.recent).to eq(
                [newer_post, old_post]
            )

            old_post.update_column :created_at, Time.now
            expect(described_class.recent).to eq(
                [old_post, newer_post]
            )
        end
    end

end
