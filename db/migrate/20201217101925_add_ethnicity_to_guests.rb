class AddEthnicityToGuests < ActiveRecord::Migration[6.0]
  def change
    add_column :guests, :ethnicity, :string
  end
end
