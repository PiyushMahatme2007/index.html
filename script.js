let board = document.getElementById("board");
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
let moveHistory = [];
let timer;
let timeLeft = 10;

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

    if(moveHistory.length>6){
        let removeIndex = moveHistory.shift();
        gameState[removeIndex]="";
    }

    createBoard();

    if(checkWinner()){
        alert(currentPlayer+" Wins!");
        restartGame();
        return;
    }

    switchPlayer();
}

function switchPlayer(){
    currentPlayer = currentPlayer==="X"?"O":"X";
    resetTimer();
}

function resetTimer(){
    clearInterval(timer);
    timeLeft = 10;

    timer = setInterval(()=>{
        if(currentPlayer==="X"){
            document.getElementById("timer1").innerText=timeLeft;
            document.getElementById("timer2").innerText=0;
        }else{
            document.getElementById("timer2").innerText=timeLeft;
            document.getElementById("timer1").innerText=0;
        }

        if(timeLeft<=0){
            clearInterval(timer);
            let winner = currentPlayer==="X"?"O":"X";
            alert("Time Over! "+winner+" Wins!");
            restartGame();
        }

        timeLeft--;
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
    gameState=["","","","","","","","",""];
    moveHistory=[];
    currentPlayer="X";
    clearInterval(timer);
    document.getElementById("timer1").innerText=10;
    document.getElementById("timer2").innerText=10;
    createBoard();
    resetTimer();
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
resetTimer();
