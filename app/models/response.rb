class Response < ActiveRecord::Base
  belongs_to :submission
  belongs_to :choice
  has_one :survey, through: :submission
  has_one :user, through: :submission
  has_one :question, through: :choice
end
