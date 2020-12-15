class ChangeTitleInAnswers < ActiveRecord::Migration[6.0]
  def change
    rename_column :answers, :title, :name
  end
end
