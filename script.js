const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

let player1Name = "";
let player2Name = "";
let currentPlayer = 1;

let player1Moves = [];
let player2Moves = [];

const tapSound = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");
const winSound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function startGame() {
    player1Name = document.getElementById("player1").value.trim();
    player2Name = document.getElementById("player2").value.trim();

    const firstTurn = document.getElementById("firstTurn").value;
    currentPlayer = parseInt(firstTurn);

    if (player1Name === "") player1Name = "X";
    if (player2Name === "") player2Name = "O";

    statusText.innerText = player1Name + " vs " + player2Name + " | " +
        (currentPlayer === 1 ? player1Name : player2Name) + "'s Turn";

    gameActive = true;
}

cells.forEach(cell => cell.addEventListener("click", cellClicked));

function cellClicked() {
    if (!gameActive) return;

    const index = this.getAttribute("data-index");
    if (board[index] !== "") return;

    tapSound.play();

    let mark = currentPlayer === 1 
        ? player1Name.charAt(0).toUpperCase() 
        : player2Name.charAt(0).toUpperCase();

    board[index] = mark;
    this.innerText = mark;
    this.classList.add(currentPlayer === 1 ? "player1" : "player2");

    if (currentPlayer === 1) {
        player1Moves.push(index);
        if (player1Moves.length > 3) {
            removeOldMove(player1Moves.shift());
        }
    } else {
        player2Moves.push(index);
        if (player2Moves.length > 3) {
            removeOldMove(player2Moves.shift());
        }
    }

    if (checkWinner()) return;

    currentPlayer = currentPlayer === 1 ? 2 : 1;

    statusText.innerText = 
        (currentPlayer === 1 ? player1Name : player2Name) + "'s Turn";
}

function removeOldMove(index) {
    board[index] = "";
    cells[index].innerText = "";
    cells[index].classList.remove("player1", "player2", "win");
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a,b,c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            winSound.play();
            statusText.innerText = 
                (currentPlayer === 1 ? player1Name : player2Name) + " Wins! 🎉";

            gameActive = false;
            return true;
        }
    }
    return false;
}

function restartGame() {
    board = ["","","","","","","","",""];
    player1Moves = [];
    player2Moves = [];
    gameActive = false;

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("player1","player2","win");
    });

    statusText.innerText = "Press Start Game";
}
