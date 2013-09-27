class Choice < ActiveRecord::Base
  belongs_to :question
  belongs_to :survey, through: :questions
  has_many :responses
  has_many :submissions, through: :responses

end
