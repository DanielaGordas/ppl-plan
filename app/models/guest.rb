class Guest < ApplicationRecord
	has_many :answers

	GENDER = ["Man", "Woman", "Prefer to self-describe", "Prefer not to disclose"]
	AGE = ["16-24", "25-34", "35-44", "45-54", "55-64", "65+", "Prefer not to disclose"]

	validates :gender, presence: true, inclusion: { in: GENDER }
	validates :age, presence: true, inclusion: { in: AGE }
	validates :postal_code, presence: true, format: { with: /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/, message: "Please provide a valid post code", multiline: true}
end
