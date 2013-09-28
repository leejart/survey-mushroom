class User < ActiveRecord::Base
  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: :true, on: :create
   

  has_many :surveys
  has_many :submissions
  has_many :questions, through: :surveys
  has_many :responses, through: :submissions


  include BCrypt

    def password
      @password ||= Password.new(password_hash)
    end

    def password=(new_password)
      @password = Password.create(new_password)
      self.password_hash = @password
    end
end
