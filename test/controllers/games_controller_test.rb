require 'test_helper'

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get games_show_url
    assert_response :success
  end

end
