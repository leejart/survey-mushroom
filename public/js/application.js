$(document).ready(function() {

  $("#input").on('submit', function(event){
    event.preventDefault();
    console.log("test");
    var input = $(this).serializeArray();
    var email_regex = new RegExp(".");
    var password_regex = new RegExp(".");
    console.log(input[0].value);

    if (input[0].value.length < 5){
      alert("Name has to be five letters!");
    }
    else if(!( password_regex.test(input[1].value)))
    {
      alert("Invalid password: password must be between four and eight digits and include a number");
    }
    else if(!(email_regex.test(input[2].value)))
    {
      alert("that email is bogus");
    }
    else
    {
      $.post('/signup', input, function(response){
        console.log(response)
        if (response == 'true'){
        window.location.href='/profile'
          }

      });
    }
  });

  var delete_by_id = function(response){
      var q_id = response.question_id;
      console.log($('#'+q_id));
      $('#'+q_id).slideUp(function(){
        this.remove();
      });
    };

  var on_delete_clicked = function(event){
    event.preventDefault();
    var url = $(this).attr('href');
    var parent = ($(this).parent('div'));
    $.get(url, delete_by_id, "json");
  };

  var add_question = function(event){
    event.preventDefault();
    var url = $(this).attr('href');
    console.log($(this));
    var last_div = ($(this).closest("div"));
    $.get(url, function(response){
      var test222 = last_div.after(response).hide();
      test222.slideDown();
    });
  };

  $('.survey-questions').on('click', '.delete-question', on_delete_clicked );
  $('#add-question').on('click', add_question);
  $('.add-choice').on('click', add_question);

});
