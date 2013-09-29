(function ($) {

var hidden = document.getElementById('canttakethatback');
 var hidden2 = document.getElementsByClassName('dontworry');
$('.radio').change(function() {
  $(this).parent().hide();
  $(hidden).show();
  $(this).show();
  $(hidden).hide(2000);
});

});
