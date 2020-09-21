class GuestAnswer < ApplicationRecord
  belongs_to :guest
  belongs_to :answer
end
