const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xMoves = [];
let oMoves = [];

const tapSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

cells.forEach(cell => cell.addEventListener("click", cellClicked));

function cellClicked() {
    const index = this.getAttribute("data-index");

    if (!gameActive || board[index] !== "") return;

    tapSound.play();

    board[index] = currentPlayer;
    this.innerText = currentPlayer;
    this.classList.add(currentPlayer.toLowerCase());

    if (currentPlayer === "X") {
        xMoves.push(index);
        if (xMoves.length > 3) {
            const removeIndex = xMoves.shift();
            removeMark(removeIndex);
        }
    } else {
        oMoves.push(index);
        if (oMoves.length > 3) {
            const removeIndex = oMoves.shift();
            removeMark(removeIndex);
        }
    }

    checkWinner();
}

function removeMark(index) {
    board[index] = "";
    cells[index].innerText = "";
    cells[index].classList.remove("x", "o");
}

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = currentPlayer + " Wins! 🎉";
            gameActive = false;
            return;
        }
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = currentPlayer + "'s Turn";
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    xMoves = [];
    oMoves = [];
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("x", "o");
    });
}
