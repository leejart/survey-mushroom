class Choice < ActiveRecord::Base
  belongs_to :question
  has_one :survey, through: :questions
  has_many :responses
  has_many :submissions, through: :responses
end
