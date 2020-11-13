class AddSelectedToAnswers < ActiveRecord::Migration[6.0]
  def change
    add_column :answers, :selected, :boolean, default: false
  end
end
