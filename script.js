
const gameResults = document.querySelector('h4') // provide the status of the game & communicates with player
let gameActive = true;
// //require gameActive to determine if a game is currently underway. 
const playButton = document.getElementById('Play');
const resetButton = document.getElementById('Reset')

let player1Turn = true
let gameStatus = ["", "", "", "", "", "", "", "", ""]; 
// each cell is treated as a string in an array. Currently each cell is empty as no move has been played.

// //PICKING A CHARACTER: 
let player1Selection = '' 
let player2Selection = ''
let currentPlayer = ''
let player1Scores = {
    player1Selection: []
}
let plater2Scores = {
    player2Selection: []
}

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

       
// function characterChosenCheck () {
//     if (player1Selection === '' || player2Selection === '') {
//         gameResults.innerHTML= "You need to chose a character to play";
//         document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', cellSelectedOutcome))
//         return;
//     } else {
//         document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome))
//         return;
//     }
// }

function disableCharacterButtons () {
    if (player1Selection = 'Witch') {
        document.getElementById('Witch').disabled = true;

    } else if (player1Selection = 'Vampire') {
        document.getElementById('Vampire').disabled = true;

    } else if (player1Selection = 'Werewolf') {
        document.getElementById('Werewolf').disabled = true;
        
    } else {
        return;
    }
}

const chooseButton = document.getElementById('choose')

chooseButton.addEventListener('click', (event) => {
    
    if (player1Selection === '') {
        player1Selection = selectCharacter();
        currentPlayer = player1Selection
        gameResults.innerHTML = `Player 1 has selected: ${player1Selection}. Now player 2 has to decide...remember you can't be the same character!`
        disableCharacterButtons ()

    } else if (player2Selection === '') {
            player2Selection = selectCharacter();
            if (player1Selection != player2Selection) {
            gameResults.innerHTML= `Player 2 has selected: ${player2Selection}. Hit play to start the game`
            
            document.getElementById('Werewolf').disabled = true;
            document.getElementById('Vampire').disabled = true;
            document.getElementById('Witch').disabled = true;

            } else {
            gameResults.innerHTML= `You need to chose a different character to player 1`
            player2Selection = ''
            }

    } else {
        console.log('no character selected')
    }
})

// //GAMEPLAY:

playButton.addEventListener('click', (event) => {
    gameActive = true;
    gameResults.innerHTML= "Player 1 goes first";
})

//when player selects a cell, the current player's character string is entered, i.e. if player1's turn and they are 'witch', 
//if they select cell 2, cell 2 becomes the current player, elimination the possibility of the cell being player again

function cellSelected(clickedCell, cellIndex) {
        gameActive;
        gameStatus[cellIndex] = currentPlayer; //current player is pushed into the cell index
        clickedCell.innerHTML = currentPlayer; //report to player
}

function cellSelectedOutcome(event) {
    gameActive; 
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-cell-index');

    gameResults.innerHTML= `It's ${currentPlayer}'s turn`;
    player1Turn = !player1Turn;
    currentPlayer = player1Turn ? player1Selection : player2Selection; //ternary exp. 

    if (gameStatus[cellIndex] !== "" && !gameActive) {
        return;
    }
    // characterChosenCheck ()
    cellSelected(clickedCell, cellIndex);
    checkifWin();
}

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

function checkifWin() {

    let matchWon = false

    for (let condition of winningConditions) {

        if (gameStatus[condition[0]] === gameStatus[condition[1]] && gameStatus[condition[0]] === gameStatus[condition[2]] && gameStatus[condition[0]] !== "") {
            matchWon = true
            console.log('winner')
            gameResults.innerHTML = gameResults.innerHTML = `Player ${currentPlayer} has won. Hit rematch to start again or reset to play with new characters!`
            gameActive = false;
            gameStatus = ["", "", "", "", "", "", "", "", ""];
            document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', cellSelectedOutcome));
            return;
            }
    }

    let gameDraw = !gameStatus.includes(""); //i.e. no empty places left to go

    if (gameDraw) {
        gameResults.innerHTML = gameResults.innerHTML = `It's a draw. Hit rematch to play againt or restart game to choose new characters`
        gameActive = false;
        return;
    }
    return currentPlayer
}

function rematchGame() {
    gameActive = true;
    currentPlayer = player1Selection
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    gameResults.innerHTML = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
}

function resetGame() {
    gameActive = true;
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    player1Selection = ''
    player2Selection = ''
    player2Scores.player2Selection[0] = ''
    player1Scores.player1Selection[0] = ''
    gameResults.innerHTML = gameResults.textContent
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
document.getElementById('Rematch').addEventListener('click', rematchGame);
document.getElementById('Reset').addEventListener('click', resetGame);