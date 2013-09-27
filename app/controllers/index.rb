get '/' do
  # Look in app/views/index.erb
  erb :index
end

get "/create/survey" do 

  erb :create_survey
end

get '/profile/name' do

  erb :profile
end 

get '/signup' do 

  erb :signup
end

get '/surveys' do 

  erb :surveys
end

get '/survey/1' do 

  erb :survey
end

###--------------------POST

post '/login' do

  redirect to "/surveys"
end

post '/signup' do 

  redirect to '/surveys'
end

post '/create/survey/1' do 


  redirect to '/surveys'
end

