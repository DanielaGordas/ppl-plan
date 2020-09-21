class CreateGuests < ActiveRecord::Migration[6.0]
  def change
    create_table :guests do |t|
      t.string :token
      t.string :postal_code
      t.string :age
      t.string :gender

      t.timestamps
    end
  end
end
