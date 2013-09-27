get '/surveys' do 
  @surveys = Survey.all
  @user = User.find(session[:user_id])
  erb :surveys
end

get '/survey/:id' do 
  @survey = Survey.find(params[:id])

  erb :survey
end


get "/create/survey" do 

  erb :create_survey
end

post '/create/survey/1' do 


  redirect to '/surveys'
end

post '/survey/:survey_id/response/' do
  #puts params.inspect
  @submission = Submission.create(survey_id: params[:survey_id], user_id: 1)
  params[:answers].each do |r|
    @submission.responses << Response.create(choice_id: r.last) 
  end
  redirect to '/surveys'
end
