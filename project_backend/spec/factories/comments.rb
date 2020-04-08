FactoryBot.define do
  factory :comment do
    comment { "My comment" }
    association :post 
  end
end
