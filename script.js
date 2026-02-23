let board = document.getElementById("board");

let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
let moveHistory = [];

let timerInterval = null;
let timeLeft = 10;   // HAR TURN FIXED 10 SECOND

// ================= CREATE BOARD =================
function createBoard(){
    board.innerHTML = "";

    gameState.forEach((cell, index) => {
        let div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell;
        div.addEventListener("click", () => makeMove(index));
        board.appendChild(div);
    });
}

// ================= MAKE MOVE =================
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
        restartGame();
        return;
    }

    switchPlayer();
}

// ================= SWITCH PLAYER =================
function switchPlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    startTimer();
}

// ================= START TIMER =================
function startTimer(){

    clearInterval(timerInterval);

    timeLeft = 10;  // HAR TURN 10 SECOND

    updateTimerDisplay();

    timerInterval = setInterval(() => {

        timeLeft--;
        updateTimerDisplay();

        if(timeLeft < 0){
            clearInterval(timerInterval);

            let winner = currentPlayer === "X" ? "O" : "X";
            alert("Time Over! " + winner + " Wins!");
            restartGame();
        }

    }, 1000);
}

// ================= UPDATE TIMER DISPLAY =================
function updateTimerDisplay(){

    if(currentPlayer === "X"){
        document.getElementById("timer1").innerText = timeLeft;
        document.getElementById("timer2").innerText = "";
    } else {
        document.getElementById("timer2").innerText = timeLeft;
        document.getElementById("timer1").innerText = "";
    }
}

// ================= UNDO MOVE =================
function undoMove(){

    if(moveHistory.length === 0) return;

    clearInterval(timerInterval);

    let lastIndex = moveHistory.pop();
    gameState[lastIndex] = "";

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    createBoard();
    startTimer();
}

// ================= RESTART GAME =================
function restartGame(){

    clearInterval(timerInterval);

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
