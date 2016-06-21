console.log('hello from client.js');

$(document).ready (function(){

  console.log('hello from jquery');

$('#submitAnimal').on('click', animalOut);
getAnimal();

function animalOut(){
    var animal = $('#animalIn').val();
    var objectOut = {
      "animal" : animal,
    };
    $.ajax({
      type: 'POST',
      url: '/postAnimals',
      data: objectOut
    });
}

function getAnimal(){
    $.ajax({
      type: 'GET',
      url: '/getAnimal',
      success: function(data){
        animalDisplay(data);
    }
  });
}//end function get animal

function animalDisplay(animal){
  $('#animalIn').val();
  for( var i=0; i<animal.length; i++){
    $('#outputDiv').append('<p>Animal: ' + animal[i].animal + " , Amount: " + animal[i].num_of_animal + '</p>');
  }
}//end animalDisplay
});//END JQUERY
