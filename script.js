
const gameResults = document.querySelector('h4') // provide the status of the game & communicates with player

// //PICKING A CHARACTER: 

let player1Selection = '' 
let player2Selection = ''

const selectCharacter = () => {
        let selection = '';
        if (document.getElementById('Witch').checked) {
            selection = 'Witch'
        } else if (document.getElementById('Vampire').checked) {
            selection = 'Vampire'
        } else if (document.getElementById('Werewolf').checked) {
            selection = 'Werewolf'
        }
        return selection
    }

const chooseButton = document.getElementById('choose')

chooseButton.addEventListener('click', (event) => {
    if (player1Selection === '') {
        player1Selection = selectCharacter();
        gameResults.innerHTML = `Player 1 has selected: ${player1Selection}. Now player 2 has to decide...remember you can't be the same character!`
   
    } else if (player2Selection === '') {
            player2Selection = selectCharacter();
            if (player1Selection != player2Selection) {
            gameResults.innerHTML= `Player 2 has selected: ${player2Selection}. Hit play to start the game`
            } else {
            gameResults.innerHTML= `You need to chose a different character to player 1`
            player2Selection = ''
            }

    } else {
        console.log('no character selected')
    }
})

// //GAMEPLAY:
let gameActive = true;
// //require gameActive to determine if a game is currently underway. 

const playButton = document.getElementById('Play');

playButton.addEventListener('click', (event) => {
    gameActive = true;
    gameResults.innerHTML= "Player 1 goes first";
})

let currentPlayer = player1Selection;
let gameStatus = ["", "", "", "", "", "", "", "", ""]; 
// each cell is treated as a string in an array. Currently each cell is empty as no move has been played.

const currentPlayerTurn = () => {
    gameResults.innerHTML= `It's ${currentPlayer}'s turn`;
}
const itsAWin = () => {
    gameResults.innerHTML = `Player ${currentPlayer} has won;`
}

const itsADraw = () => {
    gameResults.innerHTML = `It's a draw. Hit rematch to play againt or restart game to choose new characters`
}

gameResults.innerHTML = currentPlayerTurn(); //always defaults to current player's turn

const winningConditions = [
    [0, 1, 2], //top left to right
    [3, 4, 5], //middle left to right
    [6, 7, 8], //bottom left to right
    [0, 3, 6], //left top to bottom
    [1, 4, 7], //middle top to bottom
    [2, 5, 8], //right top to bottom
    [0, 4, 8], //diagonal left to bottom
    [2, 4, 6] //diagonal right to bottom
]

//when player selects a cell, the current player's character string is entered, i.e. if player1's turn and they are 'witch', 
//if they select cell 2, cell 2 becomes the current player, elimination the possibility of the cell being player again

function cellSelected(clickedCell, cellIndex) {
    gameStatus[cellIndex] = currentPlayer; //current player is pushed into the cell index
    clickedCell.innerHTML = currentPlayer; //report to player
}

function cellSelectedOutcome(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-cell-index');

    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }
    cellSelected(clickedCell, cellIndex);
    checkifWin();
}

function flipPlayer() {
   if (currentPlayer === player1Selection) {
       return player2Selection
   } else if (currentPlayer === player2Selection) {
       return player1Selection
   }
   gameResults.innerHTML = currentPlayerTurn();
}

function checkifWin() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
        // 
    }
    if (gameWon) {
        gameResults.innerHTML = itsAWin();
        gameActive = false;
        return;
    }

    let gameDraw = !gameState.includes("");
    if (gameDraw) {
        gameResults.innerHTML = itsADraw();
        gameActive = false;
        return;
    }
    flipPlayer();
}

function rematchGame() {
    gameActive = true;
    currentPlayer = player1Selection
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameResults.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
document.getElementById('Rematch').addEventListener('click', rematchGame);
