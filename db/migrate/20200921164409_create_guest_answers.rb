class CreateGuestAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :guest_answers do |t|
      t.references :guest, null: false, foreign_key: true
      t.references :answer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
