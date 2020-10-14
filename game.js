var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// primera pulsación de tecla
var started = false;
//crear variable level e inicializar en 0
var level = 0;
// usa Jeyquery para saber cuando una tecla ha sido presionada
$(document).keypress(function() {
  if (!started) {
    // cuando el juego comienza cambia diciendo  nivel 0

    $("level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

//identifica cuando  se hace click en uno de los botones
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //alert( "Handler for.click() called." );
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}

function nextSequence() {
  // dentro de nextSequence incrementar el nivel de a 1
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * (4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // seleccionar cpn jquery el botton con el mismo id de rabdomChosenColour
  // animar el botin seleccionado
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Activar el sonido del boton seleccionado
  //refacroriza codigo para que funcione cuando se oprima el boton de color o cuando se oprima eñ de nextSequence
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}
//agrega sombra y recuadro cuadrado

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  // Usar Stackoverflow para  quitar la c lase pressed luego de 100 ms

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
