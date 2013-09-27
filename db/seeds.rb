require 'faker'

10.times do 
  user = User.new(name: Faker::Name.name, email: Faker::Internet.email)
  user.password = "test"
  user.save
end

survey = Survey.new(title: "Subway Food Survey", description: "why is Subway so shit?")
survey.user_id = User.first.id
survey.save

question = Question.create(question: "Do you love or hate Subway?")
survey.questions << question

Choice.create(choice: "I love it!!!", question_id: question.id)
Choice.create(choice: "I hate it!!!", question_id: question.id)
Choice.create(choice: "It's ok when i'm drunk", question_id: question.id)

question = Question.create(question: "Whatis the best restaurant in River North?")
survey.questions << question

Choice.create(choice: "Subway", question_id: question.id)
Choice.create(choice: "Chipotle", question_id: question.id)
Choice.create(choice: "Portillo's", question_id: question.id)
Choice.create(choice: "7-11", question_id: question.id)

User.all.each do |user|
  surveys = Survey.all
  surveys_count = Survey.all.count
  survey = surveys[rand(surveys_count)]
  submission = Submission.create(user_id: user.id, survey_id: survey.id, completed: true)
  survey.questions.each do |question|
    answer = question.choices.sample
    Response.create(choice_id: answer.id, submission_id: submission.id)
  end
end

