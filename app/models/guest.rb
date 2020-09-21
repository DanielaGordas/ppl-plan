class Guest < ApplicationRecord
	has_one :survey
	has_many :guest_answers
	has_many :answers, through: :guest_answers

	GENDER = ['Female', 'Male', 'Other']
	AGE = ['18-25', '25-40', '40-60', '60+']

	validates :gender, presence: true, inclusion: { in: GENDER }
	validates :age, presence: true, inclusion: { in: AGE }
	validates :postal_code, presence: true
end
