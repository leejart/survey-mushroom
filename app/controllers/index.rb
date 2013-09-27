get '/' do
  # Look in app/views/index.erb
  erb :index
end

###--------------------POST

post '/login' do

  redirect to "/"
end

