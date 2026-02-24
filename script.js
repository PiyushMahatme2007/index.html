let board;
let currentPlayer = "X";
let gameState;
let moveHistory;
let timerInterval;
let timeLeft;

window.onload = function(){
    board = document.getElementById("board");
};

function startGame(){

    gameState = ["","","","","","","","",""];
    moveHistory = [];
    currentPlayer = "X";
    timeLeft = 10;

    createBoard();
    startTimer();
}

function createBoard(){
    board.innerHTML = "";

    gameState.forEach((cell, index) => {

        let div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell;

        div.addEventListener("click", function(){
            makeMove(index);
        });

        board.appendChild(div);
    });
}

function makeMove(index){

    if(gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    moveHistory.push(index);

    // 4th turn ke baad oldest remove
    if(moveHistory.length > 6){
        let removeIndex = moveHistory.shift();
        gameState[removeIndex] = "";
    }

    createBoard();

    if(checkWinner()){
        clearInterval(timerInterval);
        alert(currentPlayer + " Wins!");
        return;
    }

    switchPlayer();
}

function switchPlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    startTimer();
}

function startTimer(){

    clearInterval(timerInterval);
    timeLeft = 10;

    updateTimerDisplay();

    timerInterval = setInterval(function(){

        timeLeft--;
        updateTimerDisplay();

        if(timeLeft < 0){
            clearInterval(timerInterval);
            let winner = currentPlayer === "X" ? "O" : "X";
            alert("Time Over! " + winner + " Wins!");
        }

    },1000);
}

function updateTimerDisplay(){

    if(currentPlayer === "X"){
        document.getElementById("timer1").innerText = timeLeft;
        document.getElementById("timer2").innerText = "";
    }else{
        document.getElementById("timer2").innerText = timeLeft;
        document.getElementById("timer1").innerText = "";
    }
}

function checkWinner(){

    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combo=>{
        return combo.every(index=>{
            return gameState[index] === currentPlayer;
        });
    });
}
    gameState = ["","","","","","","","",""];
    moveHistory = [];
    currentPlayer = "X";

    createBoard();
    startTimer();
}

// ================= CHECK WINNER =================
function checkWinner(){

    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combo => {
        return combo.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

// ================= INIT =================
createBoard();
startTimer();
