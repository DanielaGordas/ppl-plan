class RemoveSelectedFromAnswers < ActiveRecord::Migration[6.0]
  def change
    remove_column :answers, :selected, :boolean
  end
end
