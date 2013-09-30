// Object Form

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

      $(".survey-questions").append(template).hide().slideDown();

      $.each(question.choices, function(index,choice){

        var choiceTemplate = $("#choice-template").html();
        var template = nano(choiceTemplate, choice);
        $('.choices#question'+question.id).append(template).hide().slideDown();

      });
    });
  },

  htmlchoice: function(choice){
    var choiceTemplate = $("#choice-template").html();
    var template = nano(choiceTemplate, choice);
    console.log(choice.question_id);
    // template;
    $('.choices#question'+choice.question_id).append(template).slideDown();
  },

  htmlQuestionAdd: function(question){
    var questionTemplate = $("#question-template").html();
    var template = nano(questionTemplate, question);
    // console.log(choice.question_id);
    // template;
    $('.survey-questions').append(template).slideDown();
  },



};

// Form Constructors

var Question = function(json, choices){
  var self = this
  this.id = json.id;
  this.question = json.question;
  this.sort_order = json.sort_order;
  this.choices = [];
  this.survey_id = json.survey_id;
  $.each(choices, function(index, object){
    self.choices[index] = new Choice(object, index);
  });
};

var ajaxQuestion = function(json){
  var self = this
  this.id = json.id;
  this.question = json.question;
  this.sort_order = json.sort_order;
  this.survey_id = json.survey_id;
};

var Choice = function(json, index){
  // console.log(this);
  this.id = json.id;
  this.choice = json.choice;
  this.question_id = json.question_id
  this.sort_order = json.sort_order;
  this.index = index+1;
}

// Other functions

var generate_form = function(json){
    // console.log(json)
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

function animateColor(self){
  color = $(self).css('background-color');
  $(self).animate({'background-color': 'rgba(0,150,0,0.5)'}, 1).animate({'background-color': color},1500);
}



$(document).ready(function() {
  $.get('/ajax/survey/1/edit',generate_form,'json');

  // $('.edit-survey').on('click', 'div.choice-drag', function() {
  //   // console.log("hello")
  //   $( "div.choice-drag" ).sortable();
  //   $( "div.choice-drag" ).disableSelection();
  // });

  $('.survey-info').on('change', 'textarea', function(){
    surveyid = $(this).attr('id');
    data = { data: { description: $(this).val(), id: surveyid } };
    var self = this;
    $.post('/ajax/update/survey', data, function(response){
      animateColor(self);
    })
  })

  $('.survey-info').on('change', "input[name='survey[title]']", function(){
    surveyid = $(this).attr('id');
    data = {data:{title: $(this).val(), id: surveyid }};
    var self = this;
    $.post('/ajax/update/survey', data, function(response){
      if (response.update = true) {
        animateColor(self);
      }
    });
  });

  $('.survey-questions').on('change', '.choice input', function(){
    choiceid = $(this).attr('id');
    data = { data: { choice: $(this).val(), id: choiceid } };
    var self = this;
    $.post('/ajax/update/choice', data, function(response){
      animateColor(self);
    })
  })

  $('.survey-questions').on('change', 'textarea', function(){
    questionid = $(this).attr('id');
    data = { data: { question: $(this).val(), id: questionid } };
    var self = this;
    $.post('/ajax/update/question', data, function(response){
      animateColor(self);
    })
  })

  $('.survey-questions').on('click', '.delete', function(event){
    event.preventDefault();
    url = $(this).attr('href');
    var self = this;
    $.get(url, function(response){
      if (response.deleted = true) {
        $(self).parent('div').parent('div').slideUp();
      }
    });
  });

  $('.survey-questions').on('click', '.add-choice', function(event){
    event.preventDefault();
    url = $(this).attr('href');
    console.log(this);
    var self = this;
    $.get(url, function(response){
        console.log(response.choice);
        choice = new Choice(response.choice);
        $(Form.htmlchoice(choice));
    }, 'json');
  });

  $('.survey-questions').on('click', '.delete-question', function(event){
    event.preventDefault();
    url = $(this).attr('href');
    console.log(this);
    var self = this;
    $.get(url, function(response){
      if (response.deleted = true) {
        $(self).parent('div').parent('div').slideUp();
      }
    }, 'json');
  });

  $('.add-question').on('click', function(event){
    event.preventDefault();
    url = $(this).attr('href');
    console.log(this);
    var self = this;
    $.get(url, function(response){
        console.log(response.question);
        question = new ajaxQuestion(response.question);
        $(Form.htmlQuestionAdd(question));
    }, 'json');
  });


});
