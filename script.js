const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["","","","","","","","",""];
let currentPlayer = 1;
let gameActive = false;
let timerInterval;

let p1Name = "Player 1";
let p2Name = "Player 2";

let p1Moves = [];
let p2Moves = [];

const tapSound = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");
const winSound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

function startGame(){
    p1Name = document.getElementById("player1Input").value || "X";
    p2Name = document.getElementById("player2Input").value || "O";

    document.getElementById("p1Name").innerText = p1Name;
    document.getElementById("p2Name").innerText = p2Name;

    currentPlayer = parseInt(document.getElementById("firstTurn").value);
    gameActive = true;

    startTimer();
}

cells.forEach(cell => {
    cell.addEventListener("click", function(){

        if(!gameActive) return;

        let index = parseInt(this.dataset.index);

        if(board[index] !== "") return;

        tapSound.currentTime = 0;
        tapSound.play();

        let mark = currentPlayer === 1
            ? p1Name.charAt(0).toUpperCase()
            : p2Name.charAt(0).toUpperCase();

        board[index] = mark;
        this.innerText = mark;
        this.classList.add(currentPlayer === 1 ? "player1Mark" : "player2Mark");

        // 3 Move Rotation Rule
        if(currentPlayer === 1){
            p1Moves.push(index);
            if(p1Moves.length > 3){
                let removeIndex = p1Moves.shift();
                clearCell(removeIndex);
            }
        } else {
            p2Moves.push(index);
            if(p2Moves.length > 3){
                let removeIndex = p2Moves.shift();
                clearCell(removeIndex);
            }
        }

        if(checkWinner()){
            winSound.play();
            statusText.innerText = (currentPlayer === 1 ? p1Name : p2Name) + " Wins!";
            gameActive = false;
            clearInterval(timerInterval);
            return;
        }

        switchPlayer();
    });
});

function clearCell(index){
    board[index] = "";
    cells[index].innerText = "";
    cells[index].classList.remove("player1Mark","player2Mark","win");
}

function switchPlayer(){
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    startTimer();
}

function startTimer(){
    clearInterval(timerInterval);

    let time = 10;   // ✅ Timer now 10 seconds

    updateTimerDisplay(time);

    timerInterval = setInterval(()=>{
        time--;
        updateTimerDisplay(time);

        if(time <= 0){
            clearInterval(timerInterval);
            gameActive = false;

            let winner = currentPlayer === 1 ? p2Name : p1Name;
            statusText.innerText = "Time Over! " + winner + " Wins!";
        }
    },1000);
}

function updateTimerDisplay(time){
    if(currentPlayer === 1){
        document.getElementById("p1Timer").innerText = time;
        document.getElementById("p2Timer").innerText = "00";
    } else {
        document.getElementById("p2Timer").innerText = time;
        document.getElementById("p1Timer").innerText = "00";
    }
}

function checkWinner(){
    const winComb = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for(let combo of winComb){
        let [a,b,c] = combo;

        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            return true;
        }
    }
    return false;
}

function restartGame(){
    board = ["","","","","","","","",""];
    p1Moves = [];
    p2Moves = [];
    gameActive = false;
    clearInterval(timerInterval);

    cells.forEach(cell=>{
        cell.innerText = "";
        cell.classList.remove("player1Mark","player2Mark","win");
    });

    document.getElementById("p1Timer").innerText = "00";
    document.getElementById("p2Timer").innerText = "00";
    statusText.innerText = "Game Restarted";
                                }
