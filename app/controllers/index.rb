get '/' do
  if session?
    erb :profile
  else
    erb :index
  end
end








