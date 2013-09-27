class Submission < ActiveRecord::Base
  belongs_to :user
  belongs_to :survey
  has_many :responses
  has_many :questions, through: :surveys

end
