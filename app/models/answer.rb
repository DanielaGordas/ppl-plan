class Answer < ApplicationRecord
  belongs_to :game
  has_many :guest_answers
end
