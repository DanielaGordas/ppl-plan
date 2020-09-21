ActiveAdmin.register Guest do
  permit_params :token, :postal_code, :age, :gender
  
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :token, :postal_code, :age, :gender
  #
  # or
  #
  # permit_params do
  #   permitted = [:token, :postal_code, :age, :gender]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
