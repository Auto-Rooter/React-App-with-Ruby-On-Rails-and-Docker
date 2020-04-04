class Post < ApplicationRecord
    has_one_attached :image
    has_many :comments, dependent: :destroy

    validates :title, presence: true
    validates :description, presence: true

    scope :recent, -> { order(created_at: :desc)}
end
