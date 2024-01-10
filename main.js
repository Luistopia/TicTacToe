const board =[
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];
let userScore = 0;
let computerScore = 0;

let turn = 0;  // 0 = user 1 = computer
const boardContainer =  document.querySelector('#board');
const playerDiv = document.querySelector('#player');

startGame();
updateScoreboard()


function updateScoreboard() {
    const userScoreElement = document.getElementById('user-score');
    const computerScoreElement = document.getElementById('computer-score');
    userScoreElement.textContent = `User: ${userScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
}

function startGame(){
  renderBoard();
   turn = Math.random() <= 0.5 ? 0 : 1;
  renderCurrentPlayer();

  if(turn === 1){
   
    computerPlays();
  }else{
    playerPlays();
  }
  const playAgainButton = document.getElementById("play-again");
  playAgainButton.addEventListener('click', () => {
    resetBoard();
    startGame();
  });
  
}
function playerPlays() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, i) => {
        const column = i % 3;
        const row = parseInt(i / 3);

        if (board[row][column] === '') {
            cell.addEventListener('click', e => {
                if (turn === 0) {
                    board[row][column] = 'O';
                    cell.textContent = board[row][column];
                    const won = checkIfWinner();

                    if (won === 'none') {
                        turn = 1;
                        renderCurrentPlayer();
                        computerPlays();
                    }
                }
            });
        }
    });
}

function computerPlays(){
    renderCurrentPlayer();
    setTimeout( ()=> {
       let played= false;
       const options = checkIfCanWin();
       if(options.length > 0){
        const bestOption = options[0];
        for(let i = 0; i < bestOption.length; i++){
           if(bestOption[i].value === 0){
            const posi = bestOption[i].value.i;
            const posj = bestOption[i].value.j;
            board[posi][posj] = 'X';
            played = true; 
            break;

           }
        }
   

       }else{
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
               if(board[i][j] === '' && !played){
                board[i][j] = 'X';
                played = true;
               }
            }
        }
       }

       turn = 0;
       renderBoard();
       renderCurrentPlayer();
       playerPlays();

       const won = checkIfWinner();
       if(won === 'none'){
      
        return
       }
       if(won === 'draw'){
        renderDraw();
        return;
       }
    }, 1500)
    playerPlays();
}

function renderDraw() {
    playerDiv.textContent = 'Draw';
}

function checkIfCanWin(){
  const arr = JSON.parse(JSON.stringify(board));

  for(let i = 0; i < arr.length; i++){
     for(let j = 0; j < arr.length; j++){
        if(arr[i][j] === 'X'){
            arr[i][j] = {value: 1, i, j};
        }
        if(arr[i][j] === ''){
            arr[i][j] = {value: 0, i, j};
        }
        if(arr[i][j] === 'O'){
            arr[i][j] = {value: -2, i, j};
        }
  }
  }
  const p1 = arr[0][0].value;
  const p2 = arr[0][1].value;
  const p3 = arr[0][2].value;
  const p4 = arr[1][0].value;
  const p5 = arr[1][1].value;
  const p6 = arr[1][2].value;
  const p7 = arr[2][0].value;
  const p8 = arr[2][1].value;
  const p9 = arr[2][2].value;
  

  const s1 = [p1,p2,p3];
  const s2 = [p4,p5,p6];
  const s3 = [p7,p8,p9];
  const s4 = [p1,p4,p7];
  const s5 = [p2,p5,p8];
  const s6 = [p3,p6,p9];
  const s7 = [p1,p5,p9];
  const s8 = [p3,p5,p7];

const res = [s1,s2,s3,s4,s5,s6,s7,s8].filter(line => {
    return(line[0].value + line[1].value + line[2].value === 2  || line[0].value + line[1].value + line[2].value === -4);
});
return res; 
}


function checkIfWinner(){

    const p1 = board[0][0];
  const p2 = board[0][1];
  const p3 = board[0][2];
  const p4 = board[1][0];
  const p5 = board[1][1];
  const p6 = board[1][2];
  const p7 = board[2][0];
  const p8 = board[2][1];
  const p9 = board[2][2];
  

  const s1 = [p1,p2,p3];
  const s2 = [p4,p5,p6];
  const s3 = [p7,p8,p9];
  const s4 = [p1,p4,p7];
  const s5 = [p2,p5,p8];
  const s6 = [p3,p6,p9];
  const s7 = [p1,p5,p9];
  const s8 = [p3,p5,p7];

  const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter(line => {
    return (
        line[0] === "X" && line[1] === "X" && line[2] === "X" ||
        line[0] === "O" && line[1] === "O" && line[2] === "O"
    );
});


if (res.length > 0) {
    if (res[0][0] === "X") {
        playerDiv.innerHTML = '<span style="color: bisque; background-color:black; font-size: 24px;">Computer WINS</span>';
        computerScore++;
    } else {
        playerDiv.innerHTML = '<span style="color: bisque; background-color:black; font-size: 24px;">User WINS</span>';
        userScore++;
    }

    updateScoreboard();
    resetBoard(); // Reiniciar el tablero
    return 'Computer Won';
} else {
    let draw = true;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                draw = false;
            }
        }
    }

    if (draw) {
        playerDiv.textContent = 'Draw';
       
    }

    return draw ? 'draw' : 'none';
}

}
function renderCurrentPlayer() {
    const currentPlayerText = turn === 0 ? 'Player Turn' : 'Computer Turn';
    const style = turn === 0 ? 'color: yellow; font-size: 24px;' : 'color: navy; font-size: 24px;';
    playerDiv.innerHTML = `<span style="${style}">${currentPlayerText}</span>`;
}
function renderBoard(){
    const html = board.map( row => {
        const cells = row.map(cell => {
            return `<button class="cell">${cell}</button>`;
        });
        return `<div class="row"> ${cells.join('')}</div>`;
    });

    boardContainer.innerHTML = html.join('');
}
function resetBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = '';
        }
    }
    renderBoard(); // Vuelve a renderizar el tablero vacío
}
