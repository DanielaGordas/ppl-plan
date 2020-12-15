class AddGameToAnswers < ActiveRecord::Migration[6.0]
  def change
    add_column :answers, :game, :string
  end
end
