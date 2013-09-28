get '/surveys' do
  erb :surveys
end

get '/survey/:survey_id' do
  @survey = Survey.find(params[:survey_id])
  erb :survey
end

get '/survey/:survey_id/edit' do
  @survey = Survey.find(params[:survey_id])
  erb :survey_edit
end

get '/survey/new' do


end

get '/survey/:survey_id/:question_id/newchoice' do
  Choice.create(question_id: params[:question_id])
  redirect to "/survey/#{params[:survey_id]}/edit"
end

get '/survey/:survey_id/newquestion' do
  Question.create(survey_id: params[:survey_id])
  redirect to "/survey/#{params[:survey_id]}/edit"
end


post '/survey/:survey_id/response/' do
  #puts params.inspect
  @submission = Submission.create(survey_id: params[:survey_id], user_id: 1)
  params[:answers].each do |r|
    @submission.responses << Response.create(choice_id: r.last)
  end
  redirect to '/surveys'
end

post '/survey/:survey_id/edit' do
  p params
  @survey = Survey.find(params[:survey_id])
  @survey.update(params[:survey])
  erb :survey_edit
end

post '/survey/:survey_id/:question_id/save' do
  p "\n\n"
  p params
  p "\n\n"
  question = Question.find(params[:question_id])

  question.update(params[:question])

  choices = params[:choice]

  unless choices.nil?
    choices.each do |choice|
      Choice.find(choice.first.to_i).update(choice: choice.last)
    end
  end


  redirect to "/survey/#{params[:survey_id]}/edit"

end
