class SurveyTopic < ApplicationRecord
  belongs_to :topic
  belongs_to :survey
end
