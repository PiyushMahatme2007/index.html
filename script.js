let board = document.getElementById("board");
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
let moveHistory = [];
let timer = null;
let timeLeft = 10;   // HAR TURN 10 SECOND

function createBoard(){
    board.innerHTML="";
    gameState.forEach((cell,index)=>{
        let div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell;
        div.addEventListener("click",()=>makeMove(index));
        board.appendChild(div);
    });
}

function makeMove(index){
    if(gameState[index]!=="" ) return;

    gameState[index]=currentPlayer;
    moveHistory.push(index);

    // 4th turn ke baad oldest remove
    if(moveHistory.length>6){
        let removeIndex = moveHistory.shift();
        gameState[removeIndex]="";
    }

    createBoard();

    if(checkWinner()){
        clearInterval(timer);
        alert(currentPlayer+" Wins!");
        restartGame();
        return;
    }

    switchPlayer();
}

function switchPlayer(){
    currentPlayer = currentPlayer==="X"?"O":"X";
    startTimer();  // har turn pe timer restart
}

function startTimer(){
    clearInterval(timer);
    timeLeft = 10;   // YAHI FIXED 10 SECOND

    timer = setInterval(()=>{

        if(currentPlayer==="X"){
            document.getElementById("timer1").innerText = timeLeft;
            document.getElementById("timer2").innerText = "";
        }else{
            document.getElementById("timer2").innerText = timeLeft;
            document.getElementById("timer1").innerText = "";
        }

        timeLeft--;

        if(timeLeft < 0){
            clearInterval(timer);
            let winner = currentPlayer==="X"?"O":"X";
            alert("Time Over! "+winner+" Wins!");
            restartGame();
        }

    },1000);
}

function undoMove(){
    if(moveHistory.length===0) return;

    let lastIndex = moveHistory.pop();
    gameState[lastIndex]="";
    switchPlayer();
    createBoard();
}

function restartGame(){
    clearInterval(timer);
    gameState=["","","","","","","","",""];
    moveHistory=[];
    currentPlayer="X";
    document.getElementById("timer1").innerText=10;
    document.getElementById("timer2").innerText=10;
    createBoard();
    startTimer();
}

function checkWinner(){
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combination=>{
        return combination.every(index=>{
            return gameState[index]===currentPlayer;
        });
    });
}

createBoard();
startTimer();
