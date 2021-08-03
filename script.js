let gameResults = document.getElementsByTagName('h4') // provides the status of the game & communicates with player
console.log(gameResults)

let gameActive = true;
let gameConditions = ["", "", "", "", "", "", "", "", ""];

let player1GoesFirst = true //player1 chooses first
let player1Selection = '' //first player selection
let player2Selection = '' //second player selection

const playButton = document.getElementById('play') // get the play button 
console.log(playButton)

playButton.addEventListener('click', (event) => {
    console.log('Click')
})
//     let selection = ''
//         if (document.getElementById('Witch').checked) {
//             selection = 'Witch'
//         } else if (document.getElementById('Vampire').checked) {
//             selection = 'Vampire'
//         } else if (document.getElementById('Werewolf').checked) {
//             selection = 'Werewolf'
//         }
//         console.log(`Selection: ${selection}`);

//     if (player1Selection === '' && player1GoesFirst === true ) {
//         let player1Selection = selection
//         let gameResults.textContent = `Player 1 has selected: ${player1Selection}`
//     }
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
// // const winningMessage = () => `Player ${currentPlayer} has won!`;
// // const drawMessage = () => `Game ended in a draw!`;
// // const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

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
