
const gameResults = document.querySelector('h4') // provide the status of the game & communicates with player

//PICKING A CHARACTER: 

let player1Selection = '' //first player selection
let player2Selection = '' //second player selection

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

const chooseButton = document.getElementById('choose') // get the choose button 

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

//GAMEPLAY:

const playButton = document.getElementById('play')
console.log(playButton)

// let gameConditions = ["", "", "", "", "", "", "", "", ""];

// const winningConditions = [
//     [0, 1, 2], //top left to right
//     [3, 4, 5], //middle left to right
//     [6, 7, 8], //bottom left to right
//     [0, 3, 6], //left top to bottom
//     [1, 4, 7], //middle top to bottom
//     [2, 5, 8], //right top to bottom
//     [0, 4, 8], //diagonal left to bottom
//     [2, 4, 6] //diagonal right to bottom
// ];
// function handleCellPlayed(clickedCell, clickedCellIndex) {
//     gameState[clickedCellIndex] = currentPlayer;
//     clickedCell.innerHTML = currentPlayer;
// }

// function handlePlayerChange() {
//     currentPlayer = currentPlayer === "X" ? "O" : "X";
//     statusDisplay.innerHTML = currentPlayerTurn();
// }
// const winningMessage = () => `Player ${currentPlayer} has won!`;
// const drawMessage = () => `Game ended in a draw!`;
// const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// statusDisplay.innerHTML = currentPlayerTurn();

// const winningConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];
// function handleResultValidation() {
//     let roundWon = false;
//     for (let i = 0; i <= 7; i++) {
//         const winCondition = winningConditions[i];
//         let a = gameState[winCondition[0]];
//         let b = gameState[winCondition[1]];
//         let c = gameState[winCondition[2]];
//         if (a === '' || b === '' || c === '') {
//             continue;
//         }
//         if (a === b && b === c) {
//             roundWon = true;
//             break
//         }
//     }
//     if (roundWon) {
//         statusDisplay.innerHTML = winningMessage();
//         gameActive = false;
//         return;
//     }

//     let roundDraw = !gameState.includes("");
//     if (roundDraw) {
//         statusDisplay.innerHTML = drawMessage();
//         gameActive = false;
//         return;
//     }
//     handlePlayerChange();
// }
// function handleCellClick(clickedCellEvent) {
//     const clickedCell = clickedCellEvent.target;
//     const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
//     if (gameState[clickedCellIndex] !== "" || !gameActive) {
//         return;
//     }
//     handleCellPlayed(clickedCell, clickedCellIndex);
//     handleResultValidation();
// }
// function handleRestartGame() {
//     gameActive = true;
//     currentPlayer = "X";
//     gameState = ["", "", "", "", "", "", "", "", ""];
//     statusDisplay.innerHTML = currentPlayerTurn();
//     document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
// }
// document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
