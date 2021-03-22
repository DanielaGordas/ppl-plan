class AddRoleToAdminUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :admin_users,
      :role, :string,
      null: false,
      default: 'read'
  end
end
