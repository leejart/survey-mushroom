var Form = function(json){
  console.log(json);
  this.id = json.survey.id;
  this.title = json.survey.title;
  this.description = json.survey.description;
  this.questions = [];
  var self = this;
  $.each(json.questions, function(index, object){
    choices = $.grep(json.choices, function(choice){
      return (choice.question_id == object.id);
    });
    self.questions[index] = new Question(object, choices);
  });
}

var Question = function(json, choices){
  var self = this
  this.id = json.id;
  this.question = json.question;
  this.sort_order = json.sort_order;
  this.choices = [];
  $.each(choices, function(index, object){
    self.choices[index] = new Choice(object);
  });
};

var Choice = function(json){
  this.id = json.id;
  this.choice = json.choice;
  this.sort_order = json.sort_order;
}

var console_log_response = function(response){
    console.log(new Form(response))

    // console.log(response)
    // var form_content = new Form(response)
    // console.log(form_content)
    // // console.log(test.questions)
    // return form_content
};



$(document).ready(function() {

// console.log('hello!');

  $.get('/ajax/survey/1/edit',console_log_response,'json');
  // console.log(test);
});
