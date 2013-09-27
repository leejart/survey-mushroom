class Survey < ActiveRecord::Base
  belongs_to :user
  has_many :questions
  has_many :submissions
  has_many :choices, through: :question
  has_many :reponses, through: :submissions
end
