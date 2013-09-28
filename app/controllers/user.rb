# GET )))))))))))))))))))))))))))))))))))))))))))

get '/profile' do
  @user = User.find(session[:user_id])
  


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
    redirect to "/profile"
  else
    redirect to "/?error=loginerror"
  end
end

post '/signup' do
  puts params.inspect

  if params[:user][:name] == nil
    redirect to "/signup?error=signuperror"
  elsif params[:user][:password] == nil
    redirect to "/signup?error=signuperror"
  else
    @user = User.new(name: params[:user][:name], email: params[:user][:email])
    @user.password = params[:user][:password]
    @user.save!
    session[:user_id] = @user.id
 
    if request.xhr?
      'true'
     else
      redirect to "/profile"
    end
  end

end
