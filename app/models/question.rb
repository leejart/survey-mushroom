class Question < ActiveRecord::Base
  belongs_to :survey
  has_one :user, through: :survey
  has_many :choices
  has_many :responses, through: :choice

end
