class Game < ApplicationRecord
  belongs_to :topic
  has_many :answers
end
