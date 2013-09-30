get '/ajax/choice/:choice_id/delete' do
  if request.xhr?
    choice = Choice.find(params[:choice_id])
    return { deleted: true }.to_json if choice.destroy
  end
end

get '/ajax/:survey_id/:question_id/newchoice' do
  if request.xhr?
    choice = Choice.create(question_id: params[:question_id])
    return { added: true, choice: choice}.to_json if choice
  end
end

get '/ajax/:survey_id/:question_id/delete' do
  if request.xhr?
    question = Question.find(params[:question_id])
    return { deleted: true}.to_json if question.destroy
  end
end

get '/ajax/survey/:survey_id/addquestion' do
  if request.xhr?
    question = Question.create(survey_id: params[:survey_id])
    return { added: true, question: question}.to_json if question
  end
end



post '/ajax/update/survey' do
  if request.xhr?
    survey = Survey.find(params[:data][:id])
    return { updated: true }.to_json if survey.update(params[:data])
  end
end

post '/ajax/update/choice' do
  if request.xhr?
    choice = Choice.find(params[:data][:id])
    return { updated: true }.to_json if choice.update(params[:data])
  end
end

post '/ajax/update/question' do
  if request.xhr?
    question = Question.find(params[:data][:id])
    return { updated: true }.to_json if question.update(params[:data])
  end
end
