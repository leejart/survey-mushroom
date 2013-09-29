String.prototype.htmlAddVariables = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};




var Form = {
  init: function(json){
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
    })
  },

   htmlheader: function(){
    var headerTemplate = $("#form-template").html();
    var template = nano(headerTemplate, this);
    $(".survey-info").append(template).hide().slideDown();
   },

   htmlquestion: function(){
    var questionTemplate = $("#question-template").html();

    $.each(this.questions, function(index,question){
      var template = nano(questionTemplate, question);
      console.log(question);
      $(".survey-questions").append(template).hide().slideDown();

      $.each(question.choices, function(index,choice){

        var choiceTemplate = $("#choice-template").html();
        var template = nano(choiceTemplate, choice);
        $('.choices#question'+question.id).append(template).hide().slideDown();

      });
    });
   }

};



var Question = function(json, choices){
  var self = this
  this.id = json.id;
  this.question = json.question;
  this.sort_order = json.sort_order;
  this.choices = [];
  this.survey_id = json.survey_id;
  $.each(choices, function(index, object){
    self.choices[index] = new Choice(object);
  });
};

var Choice = function(json){
  this.id = json.id;
  this.choice = json.choice;
  this.question_id = json.question_id
  this.sort_order = json.sort_order;
}

var generate_form = function(json){
    console.log(json)
    Form.init(json);
    Form.htmlheader(json);
    Form.htmlquestion();
};

function nano(template, data) {
  // console.log(template);
  // console.log(data);
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });
}


$(document).ready(function() {
  $.get('/ajax/survey/1/edit',generate_form,'json');
});
