get '/surveys' do 

  erb :surveys
end

get '/survey/1' do 

  erb :survey
end


get "/create/survey" do 

  erb :create_survey
end

post '/create/survey/1' do 


  redirect to '/surveys'
end
