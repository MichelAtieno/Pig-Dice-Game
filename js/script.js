//Business Logic

var allPlayers = []
var allRolls = []

function pigDice (playerName, score) {
  this.playerName = playerName;
  this.score = score;
  allPlayers.push(this);
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
    $("form#players").hide()
    $("#play").show()
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

  $("#roll1").click(function(event) {
    event.preventDefault();
    $("#result1").show();
    var randomRoll = (1 + Math.floor(Math.random()*6));
    $("#result1").text(randomRoll);
    if (randomRoll >= 2) {
      allRolls.push(randomRoll);
      $("total1").text(allRolls.sum());
    } else {
      changePlayer2();
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

   $("#hold1").click(function(event) {
     changePlayer1();
     if (allPlayers[0].score >= 100) {
       alert(allPlayers[0].playerName + "wins");
       document.location.reload(true);
     } else if (allPlayers[1].score >= 100) {
       alert(allPlayers[1].playerName + "wins");
       document.location.reload(true);
     }
   });

   function nameScore() {
    $("#player1").text(allPlayers[0].playerName);
    $("#player2").text(allPlayers[1].playerName);
    $("#player1Score").text(allPlayers[0].score);
    $("#player2Score").text(allPlayers[1].score);
   }

   function changePlayer1(){
     if($("#player1play").is(":visible")) {
       allRolls = [0];
       $("total").text(allRolls);
       setTimeout(function() {
         alert("You rolled 1");
       }, 50);
       setTimeout (function() {
         $("player2play").text(allPlayers[1].playerName).show();
       }, 100);
       $("player1play").hide();
       nameScore();
     } else if ($("player2play").is(":visible")) {
       allRolls = [0];
       $("#total").text(allRolls);
       setTimeout(function() {
         alert("You rolled a 1");
       }, 50);
       setTimeout(function() {
         $("player1play").text(allPlayers[0].playerName).show();
       }, 100);
        $("player2play").hide();
        nameScore();
     }

   }

   function changePlayer2() {
        if ($("player1play").is(":visible")) {
          allPlayers[0].score = (allPlayers[0].score += allRolls.sum());
          alert("Congratulations" + "You have" + allRolls.sum() + "points");
          allRolls = [0];
          $("#total").text(allRolls)
          $("#player1play").hide();
          $("#player2play").text(allPlayers[1].playerName).show();
          console.log(allPlayers[0].score);
          nameScore();
        }else {
          alert ("Congratulations" + "You have" + allRolls.sum() + "points");
          allPlayers[1].score = (allPlayers[1].score += allRolls.sum());
          allRolls = [0];
          $("#total").text(allRolls)
          $("#player2play").hide();
          $("#player1play").text(allPlayers[0].playerName).show();
          console.log(allPlayers[1].score);
          nameScore();
        }
     }
   });
