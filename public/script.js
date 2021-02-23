// DOM Elements
const ROCK = document.getElementById("r");
const PAPER = document.getElementById("p");
const SCISSOR = document.getElementById("s");
const DISPLAYP = document.getElementById("displayP");
const DISPLAYC = document.getElementById("displayC");
let pScore = document.getElementById("pScore");
let cScore = document.getElementById("cScore");
let gamePlay = document.getElementById("gamePlay");
let gameMsg = document.getElementById("gameMsg");
let roundNum = document.getElementById("roundNum");
let endMessage = document.getElementById("endMessage");
let restart = document.getElementById("restart");
const YES = document.getElementById("yesGame");
const NO = document.getElementById("noGame");
const GAMEBOX = document.getElementById("gameplay");



// Game Variables
let roundLocalNum = 1;
let compOption;
let playerScore = 0;
let computerScore = 0;
let optionList = [ "r", "p", "s"];


// Computer Option
let selectCompOption = () => {
    let randomNum = Math.floor(Math.random()*optionList.length);
    const randomSelection = optionList[randomNum];
    return randomSelection; 
}

// Case: player plays ROCK
let rock = () => {
    roundLocalNum++
    roundNum.innerHTML = roundLocalNum;
    DISPLAYP.src="img/rock.png";
    compOption = selectCompOption();
    DISPLAYP.style.visibility = "visible";
    DISPLAYC.style.visibility = "visible";
    if (compOption === "r") {
        gameMsg.innerHTML = "It's a tie &#128521;";
        ROCK.classList.add("tie-color");
        setTimeout(function() {ROCK.classList.remove("tie-color")}, 1000);
        DISPLAYC.src="img/rock.png";
    } else if (compOption === "p") {
        gameMsg.innerHTML = "Rock lost to Paper &#128542;";
        computerScore++
        cScore.innerHTML = computerScore;
        ROCK.classList.add("lose-color");
        setTimeout(function() {ROCK.classList.remove("lose-color")}, 1000);
        DISPLAYC.src="img/paper.png"
    } else {
        gameMsg.innerHTML = "Rock did beat Scissor &#128523;";
        playerScore++
        pScore.innerHTML = playerScore;
        ROCK.classList.add("win-color");
        setTimeout(function() {ROCK.classList.remove("win-color")}, 1000);
        DISPLAYC.src="img/f-scissors.png"
    }
    endGame()
}

// Case: player plays PAPER
let paper = () => {
    roundLocalNum++
    roundNum.innerHTML = roundLocalNum;
    DISPLAYP.src="img/paper.png";
    compOption = selectCompOption();
    DISPLAYP.style.visibility = "visible";
    DISPLAYC.style.visibility = "visible";
    if (compOption === "p") {
        gameMsg.innerHTML = "It's a tie &#128521;";
        PAPER.classList.add("tie-color");
        setTimeout(function() {PAPER.classList.remove("tie-color")}, 1000);
        DISPLAYC.src="img/paper.png";
    } else if (compOption === "r") {
        gameMsg.innerHTML = "Paper covered Rock &#128523;";
        playerScore++
        pScore.innerHTML = playerScore;
        PAPER.classList.add("win-color");
        setTimeout(function() {PAPER.classList.remove("win-color")}, 1000);
        DISPLAYC.src="img/rock.png";
    } else {
        gameMsg.innerHTML = "Paper lost to Scissor &#128542;";
        computerScore++
        cScore.innerHTML = computerScore;
        PAPER.classList.add("lose-color");
        setTimeout(function() {PAPER.classList.remove("lose-color")}, 1000);
        DISPLAYC.src="img/f-scissors.png"
    }
    endGame()
}

// Case: player plays SCISSOR
let scissor = () => {
    roundLocalNum++
    roundNum.innerHTML = roundLocalNum;
    DISPLAYP.src="img/scissors.png";
    compOption = selectCompOption();
    DISPLAYP.style.visibility = "visible";
    DISPLAYC.style.visibility = "visible";
    if (compOption === "s") {
        gameMsg.innerHTML = "It's a tie &#128521;";
        SCISSOR.classList.add("tie-color");
        setTimeout(function() {SCISSOR.classList.remove("tie-color")}, 1000);
        DISPLAYC.src="img/f-scissors.png"
    } else if (compOption === "p") {
        gameMsg.innerHTML = "Scissor did cut Paper &#128523;";
        playerScore++
        pScore.innerHTML = playerScore;
        SCISSOR.classList.add("win-color");
        setTimeout(function() {SCISSOR.classList.remove("win-color")}, 1000);
        DISPLAYC.src="img/paper.png"
    } else {
        gameMsg.innerHTML = "Scissor lost to Rock &#128542;";
        computerScore++
        cScore.innerHTML = computerScore;
        SCISSOR.classList.add("lose-color");
        setTimeout(function() {SCISSOR.classList.remove("lose-color")}, 1000);
        DISPLAYC.src="img/rock.png";
    }
    endGame()
}

let endGame = () => {
    if ((playerScore===5)||(computerScore===5)) {
        GAMEBOX.style.visibility = "hidden";
        DISPLAYP.style.visibility = "hidden";
        DISPLAYC.style.visibility = "hidden";
        if (playerScore===5) {
            endMessage.innerHTML = `You won after ${roundLocalNum} rounds.`;
            restart.innerHTML = "Wanna try again?<br>Press Reset";
        } else {
            endMessage.innerHTML = `You lost after ${roundLocalNum} rounds.`;
            restart.innerHTML = "Wanna try again?<br>Press Reset";
        }
    }
}