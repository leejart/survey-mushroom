
get '/profile/name' do

  erb :profile
end 

get '/signup' do 

  erb :signup
end


post '/login' do

  redirect to "/surveys"
end

post '/signup' do 

  redirect to '/surveys'
end
