class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.string :title
      t.string :category
      t.text :description

      t.timestamps
    end
  end
end
