class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.references :topic, null: false, foreign_key: true
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
