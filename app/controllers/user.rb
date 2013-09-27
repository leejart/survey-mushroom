# GET )))))))))))))))))))))))))))))))))))))))))))

get '/profile/:user_id' do
  @user = User.find(params[:user_id])
  erb :profile
end

get '/signup' do

  erb :signup
end

get '/logout' do
  session.clear
end


# POST ))))))))))))))))))))))))))))))))))))))))))

post '/login' do
  @user = User.find_by_email(params[:user][:email])

  if @user == nil
    redirect to "/?error=loginerror"
  elsif @user.password == params[:user][:password]
    session[:user_id] = @user.id
    redirect to "/profile/#{@user.id}"
  else
    redirect to "/?error=loginerror"
  end
end

post '/signup' do

  redirect to '/surveys'
end
