class User < ActiveRecord::Base
  has_many :surveys
  has_many :submissions
  has_many :questions, through: :surveys
  has_many :responses, through: :submissions
end
