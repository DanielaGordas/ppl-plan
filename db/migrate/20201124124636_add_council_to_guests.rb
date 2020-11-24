class AddCouncilToGuests < ActiveRecord::Migration[6.0]
  def change
    add_column :guests, :council, :string
  end
end
