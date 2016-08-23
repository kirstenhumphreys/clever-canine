// (function($){
//   $(function(){

//     $('.button-collapse').sideNav();

//   });

//   $(document).ready(function() {
//     $('select').material_select();
//   });

//   $(document).ready(function(){
//       $('.parallax').parallax();
//   });
//   // end of document ready
// })(jQuery); // end of jQuery name space


$(document).ready(function() {
  var temp = $('select')

  if (temp) {
    temp.material_select();
  }
});

$(document).ready(function(){
  var parallaxTemp = $('.parallax')

    if (parallaxTemp) {
      parallaxTemp.parallax();
    }

    });

