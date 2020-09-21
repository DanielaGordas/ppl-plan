class Question < ApplicationRecord
  belongs_to :topic
  has_many :answers
end
