var display_chart = function(json){
    settings = { scaleFontColor : "#00FF00",
                 scaleGridLineColor : "#00FF00",
                 scaleFontFamily : "'Times New Roman'",

               };
    var ctx = document.getElementById("myChart").getContext("2d");


// console.log($(ctx).css('background-color','white'));
    var myNewChart = new Chart(ctx).Bar(json,settings);

  };

$(document).ready(function() {
  $.get('/ajax/chart/1',display_chart,'json');

});
