class AddGuestIdToAnswers < ActiveRecord::Migration[6.0]
  def change
    add_reference :answers, :guest, null: false, foreign_key: true
  end
end
