FactoryBot.define do
    factory :post do
        sequence(:title) { |n| "This Title num #{n}" }
        sequence(:description) { |n| "This is a description num #{n}"}
    end
  end