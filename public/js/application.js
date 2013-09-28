
  // function question(question,choices){
  //   var question = question
  //   var choices = {}
  // }


$(document).ready(function() {

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
    var last_div = ($(this).prev('div'));
    $.get(url, function(response){
      var test222 = last_div.after(response).hide();
      test222.slideDown();
    });
  };



  $('.survey-questions').on('click', '.delete-question', on_delete_clicked );


  $('#add-question').on('click', add_question);

});
