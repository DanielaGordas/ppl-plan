class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.text :answer
      t.string :question

      t.timestamps
    end
  end
end
