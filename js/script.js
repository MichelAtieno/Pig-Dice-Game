//Business Logic

var allPlayers = []
var allRolls = []

function pigDice (playerName, score) {
  this.playerName = playerName;
  this.score = score;
  allPLayers.push(this);
}

Array.prototype.sum = function() {
  return this.reduce(function(a, b) {
    return a + b
  });
}

//User Interface Logic
$(document).ready(function(){
  $("form#players").submit(function(event){
    event.preventDefault();

    var inputtedplayer1 = $("input#player1").val();
    var inputtedplayer2 = $("input#player2").val();
    var player1 = new pigDice(inputtedplayer1, 0);
    var player2 = new pigDice(inputtedplayer2, 0);
    $("#player1play").text(allPlayers[0].playerName).show();
    nameScore();
  })

  $("#roll").click(function(event) {
    event.preventDefault();
    $("#result").show();
    var randomRoll = (1 + Math.floor(Math.random()*6));
    $("#result").text(randomRoll);
    if (randomRoll >= 2) {
      allRolls.push(randomRoll);
      $("total").text(allRolls.sum());
    } else {
      changePlayer1();
    }
  });

   $("#hold").click(function(event) {
     changePlayer2();
     if (allPlayers[0].score >= 100) {
       alert(allPlayers[0].playerName + "wins");
       document.location.reload(true);
     } else if (allPlayers[1].score >= 100) {
       alert(allPlayers[1].playerName + "wins");
       document.location.reload(true);
     }
   });

   function nameScore(){
    $("#player1").text(allPlayers[0].playerName);
    $("#player2").text(allPlayers[1].playerName);
    $("#player1Score").text(allPlayers[0].score);
    $("#player2Score").text(allPlayers[1].score);
   }

   function changePlayer1(){

   }

   function changePlayer2() {

   }


})
