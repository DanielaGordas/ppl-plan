require 'test_helper'

class GuestAnswersControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get guest_answers_create_url
    assert_response :success
  end

end
