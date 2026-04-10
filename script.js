// add javascript here
let answer = 0;
let guessCount = 0;
const scores = [];
let levels = document.getElementsByName("level");
let sumTime = 0;
let previousTime = 100000;

let myName = prompt("What is your name?");

function capitalizeFirst(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", givingUp);

function play(){
    let range = 0;
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

    window.startRoundTime = new Date().getTime();
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
    let endRoundTime = new Date().getTime();
    let elapsedTime = (endRoundTime - window.startRoundTime) / 1000;
    
    if(elapsedTime < previousTime){
        document.getElementById("fastest").textContent = "Fastest Game: " + elapsedTime;
    }
    sumTime += elapsedTime;
    averageTime = sumTime / scores.length;
    document.getElementById("avgTime").textContent = "Average Time: " + averageTime.toFixed(3);

    previousTime = elapsedTime;
}

function givingUp(){
    let range = 0;
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    updateScore(range);
    resetGame();
}

const now = new Date();
myMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = myMonths[now.getMonth()];
myDays = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
const currentDay = myDays[now.getDate()-1];


function displayTime(){
    document.getElementById("date").textContent = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ", " + currentMonth + " " + currentDay + ", " + now.getFullYear();
}

displayTime();
myCoolTimer = setInterval(displayTime, 1000);