const gameResults = document.querySelector('h4') // provide the status of the game & communicates with player
// const scores = document.getElementsByClassName("score")
const playButton = document.getElementById('Play');
const resetButton = document.getElementById('Reset')
const chooseButton = document.getElementById('choose')
const scores = document.getElementsByClassName("score")

let gameActive = true;
// //require gameActive to determine if a game is currently underway. 
let gameStatus = ["", "", "", "", "", "", "", "", ""]; 
// each cell is treated as a string in an array. Currently each cell is empty as no move has been played.
let matchWon = false
//determine if the game is won

let player1Turn = true
let player1Score = 0
let player2Score = 0

// //PICKING A CHARACTER: 
let player1Selection = '' 
let player2Selection = ''
let currentPlayer = ''
let turn = 1

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
       
function characterChosenCheck () {
    if (player1Selection === '' || player2Selection === '') {
        gameResults.innerHTML = "Choose a character to play"
        return false;
    } else {
        return true;
    }
}

function disableCharacterButtons () {
    if (player1Selection === 'Witch') {
        document.getElementById('Witch').disabled = true;

    } else if (player1Selection === 'Vampire') {
        document.getElementById('Vampire').disabled = true;

    } else if (player1Selection === 'Werewolf') {
        document.getElementById('Werewolf').disabled = true;
        
    } else {
        return;
    }
}

chooseButton.addEventListener('click', (event) => {
    
    if (player1Selection === '') {
        player1Selection = selectCharacter();
        currentPlayer = player1Selection
        gameResults.innerHTML = `Player 1 has selected: ${player1Selection}. <br> Player 2 must decide!`
        disableCharacterButtons ()

    } else if (player2Selection === '') {
            player2Selection = selectCharacter();
            if (player1Selection != player2Selection) {
            gameResults.innerHTML= `Player 2 has selected: ${player2Selection}. <br> Hit play to start`
            
            document.getElementById('Werewolf').disabled = true;
            document.getElementById('Vampire').disabled = true;
            document.getElementById('Witch').disabled = true;

            } else {
            gameResults.innerHTML= "Chose a different character to player 1"
            player2Selection = ''
            }

    } else {
        console.log('no character selected')
    }
})

// //GAMEPLAY:

playButton.addEventListener('click', (event) => {
    if (characterChosenCheck() && gameActive) {
    gameResults.innerHTML= "Player 1 goes first";
    }
})

//when player selects a cell, the current player's character string is entered, i.e. if player1's turn and they are 'witch', 
//if they select cell 2, cell 2 becomes the current player, elimination the possibility of the cell being player again

function cellSelectedOutcome(event) {
    if (characterChosenCheck() && gameActive) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.getAttribute('data-cell-index');
        
        if (gameStatus[cellIndex] !== "" && !gameActive) {
            return;
        }
        cellSelected(clickedCell, cellIndex);
    }
}
function cellSelected(clickedCell, cellIndex) {
    if (clickedCell.innerHTML ===  "") {
        gameStatus[cellIndex] = currentPlayer; //current player is pushed into the cell index
        clickedCell.innerHTML = currentPlayer; //report to player
    } else {
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
        return;
    }

    if (!gameStatus.includes("")) {
        checkifWin()
        console.log("board full")
        if (matchWon === true) {
            return;
        } else {
        gameResults.innerHTML = "It's a draw! <br> Hit rematch or restart game"
        console.log("its a draw!")
        return;
        }
    } else if (matchWon === false) {
        player1Turn = !player1Turn;
        currentPlayer = player1Turn ? player1Selection : player2Selection; //ternary exp.
        gameResults.innerHTML= `It's ${currentPlayer}'s turn`;
    }
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

function updateScore () {    //Push scores into html
    for (let score of scores) {
        let playerCharacter = score.dataset.character //if witch,werewolf or vampire loop

        if (playerCharacter === currentPlayer) {
            let currentScore = parseInt(score.innerText)
            score.innerText = currentScore + 1
        }
    }
}

function checkifWin() {
    for (let condition of winningConditions) {
        if (gameStatus[condition[0]] === gameStatus[condition[1]] && gameStatus[condition[0]] === gameStatus[condition[2]] && gameStatus[condition[0]] !== "") {
            matchWon = true
            console.log("You won")
            gameResults.innerHTML = `Player ${currentPlayer} has won! <br>
            Hit rematch or reset to play with new characters`

            if (currentPlayer === player1Selection) {
                currentScore = player1Score += 1
            } else if (currentPlayer === player2Selection) {
                currentScore = player2Score += 1
            }
            updateScore()
        }
    }
}

function rematchGame() {
    if (currentPlayer = player1Selection) {
        gameActive = true;
        matchWon = false;
        gameStatus = ["", "", "", "", "", "", "", "", ""];
        gameResults.innerHTML = `It's ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
    } else {
        gameResults.innerHTML = "Choose a character to play"
    }
}

function resetGame() {
    console.log('click')
    matchWon = false;
    gameActive = true;
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    player1Selection = ''
    player2Selection = ''
    player1Score = 0
    player2Score = 0

    for (let score of scores) {
        score.innerText = 0
    }

    document.getElementById('Werewolf').disabled = false;
    document.getElementById('Witch').disabled = false;
    document.getElementById('Vampire').disabled = false;
    gameResults.innerHTML = "Choose a character to play"
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellSelectedOutcome));
document.getElementById('Rematch').addEventListener('click', rematchGame);
document.getElementById('Reset').addEventListener('click', resetGame);

//STYLINGS:

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  const phrases = [
    'Are you watching closely...',
    'Sooner or later',
    'The monsters',
    'Will come out',
    'To play...'
  ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()