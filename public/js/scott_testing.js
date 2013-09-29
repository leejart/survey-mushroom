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


// var data = { 
//   labels : response.labels,
//   datasets : [
//     {
//       data : [65,59,90,81,56,55,40]
//     },
//     {
//       data : [28,48,40,19,96,27,100]
//     }
//   ]
// }



// new Chart(ctx).PolarArea(data);






});
