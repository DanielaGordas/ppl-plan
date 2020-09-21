class Survey < ApplicationRecord
  belongs_to :guest
  has_many :topics, through: :survey_topics
end
