class CreateSurveyTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :survey_topics do |t|
      t.references :topic, null: false, foreign_key: true
      t.references :survey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
