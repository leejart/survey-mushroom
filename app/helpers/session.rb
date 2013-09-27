helpers do

  def session?
    session[:user_id] != nil
  end

  def session_user
    if session?
      session[:user_id]
    end
  end

end
