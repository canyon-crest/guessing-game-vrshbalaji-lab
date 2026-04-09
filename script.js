// add javascript here
let answer = 0;
let guessCount = 0;
const scores = [];

let myName = prompt("What is your name?");

function capitalizeFirst(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", givingUp);


function play(){
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Guess a number 1-" + range +", " + capitalizeFirst(myName) + ".";
    answer = Math.floor(Math.random()*range) + 1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct! It took you, " + capitalizeFirst(myName) + ", " + guessCount + " tries!";
        updateScore(guessCount);
        resetGame();
    }
    else if(guess < answer){
        let difference = Math.abs(guess - answer);
        if(difference <= 2){
            msg.textContent = "Too low, try again. You are hot!";
        } else if(difference <= 5){
            msg.textContent = "Too low, try again. You are warm.";
        } else{
            msg.textContent = "Too low, try again. You are cold.";
        }
    } else{
        let difference = Math.abs(guess - answer);
        if(difference <= 2){
            msg.textContent = "Too high, try again. You are hot!";
        } else if(difference <= 5){
            msg.textContent = "Too high, try again. You are warm.";
        } else{
            msg.textContent = "Too high, try again. You are cold.";
        }
    }
    
}

function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum / scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;}); //sort score increasing

    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
}
function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}

function givingUp(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}
