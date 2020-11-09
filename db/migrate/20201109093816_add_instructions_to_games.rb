class AddInstructionsToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :instructions, :text
  end
end
