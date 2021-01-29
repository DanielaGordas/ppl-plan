class RemoveEthnicityFromGuests < ActiveRecord::Migration[6.0]
  def change
    remove_column :guests, :ethnicity, :string
  end
end
