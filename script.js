//Základní proměnné
var totalScore, roundScore, activePlayer, dice, playGame;

newStart();

function newStart(){
    totalScore = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    playGame = true;

    //Vynulování a schování kostky
    document.getElementById("totalScorePlayer-0").textContent = 0; //změní text na 0
    document.getElementById("totalScorePlayer-1").textContent = 0; //změní text na 0

    document.getElementById("currentScore0").textContent = 0; //změní text na 0
    document.getElementById("currentScore1").textContent = 0; //změní text na 0

    document.querySelector(".diceImage").style.display = "none"; //schová obrázek 
    
    //texty do původního stavu
    document.querySelector("#name-0").textContent = "Skóre 1. hráče";
    document.querySelector("#name-1").textContent = "Skóre 2. hráče";

    //vracení zvýraznění hráče u prvního a u druhého odstaníme
    document.querySelector(".totalScore0").classList.add("active"); //změna pozadí pod skóre hráče
    document.querySelector(".totalScore1").classList.remove("active"); //změna pozadí pod skóre hráče
}

//Házení kostkou
document.querySelector(".rollDice").addEventListener("click", function(){ //Zachycení kliknutí na tlačítko
    if(playGame){
        var dice = Math.ceil(Math.random()*6) //Generace čísla od 1 do 6
        var diceElement = document.querySelector(".diceImage");
        diceElement.style.display = "block"; //zobrazí obrázek
        diceElement.src = "img/" + dice + ".jpg"; //vytvoří cestu pro obrázek z náhodného čísla
    
        if(dice != 1){
            roundScore += dice; 
            document.getElementById("currentScore" + activePlayer).textContent = roundScore; //změní text na roundScore
        }
        else{
            nextPlayer();
        }
    }
}); 

//další hráč
function nextPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    }
    else{
        activePlayer = 0;
    }
    roundScore = 0;
    document.getElementById("currentScore0").textContent = roundScore; //nulování
    document.getElementById("currentScore1").textContent = roundScore; //nulování

    document.querySelector(".totalScore0").classList.toggle("active"); //změna pozadí pod skóre hráče
    document.querySelector(".totalScore1").classList.toggle("active"); //změna pozadí pod skóre hráče
}

//Podržet skore
document.querySelector(".holdScore").addEventListener("click", function(){
    if(playGame){
        totalScore[activePlayer] += roundScore;
        document.querySelector("#totalScorePlayer-" + activePlayer).textContent = totalScore[activePlayer];
    
        if(totalScore[activePlayer] >= 20){
            document.querySelector("#name-" + activePlayer).textContent = "Vítěz! Dobrá práce!";
            playGame = false;
        }
        else{
            nextPlayer();
        }
    }
});


//nová hra
document.querySelector(".newGame").addEventListener("click", newStart);
