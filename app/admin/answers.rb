ActiveAdmin.register Answer do
  permit_params :title, :category, :description, :game_id, :selected
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :category, :description, :game_id, :selected]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
