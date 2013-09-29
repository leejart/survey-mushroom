var Form = function(json){
  this.id = json.id
  this.name = json.name
  this.desciption = json.desciption
}

var console_log_response = function(response){
    console.log(response)
    test = new Form(response)
    console.log(test.id)
};



$(document).ready(function() {



console.log('hello!');

  $.get('/ajax/survey/1/edit',console_log_response,'json');

});
