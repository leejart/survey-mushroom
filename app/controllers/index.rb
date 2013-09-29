get '/' do

  if session?
    @user = User.find(session_user)
    erb :profile
  else
    erb :index
  end
end








