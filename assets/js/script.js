let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let modeSelect = document.getElementById('modeSelect')

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let gameMode = null

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked))
  modeSelect.addEventListener('change', () => {
    gameMode = modeSelect.value
    restart()
  })
  restartBtn.addEventListener('click', restart)
}

function boxClicked(e) {
  const id = e.target.id
  if (!spaces[id]) {
    spaces[id] = currentPlayer
    e.target.innerText = currentPlayer

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`
      let winning_blocks = playerHasWon()

      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
      removeListeners()
      return
    }

    if (gameMode === 'computer') {
      makeComputerMove()
    } else {
      currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
  }
}

function makeComputerMove() {
    if (playerHasWon() !== false) {
      return
    }
    let availableMoves = []
    for (let i = 0; i < spaces.length; i++) {
      if (spaces[i] === null) {
        availableMoves.push(i)
      }
    }
    if (availableMoves.length === 0) {
      return
    }
    let computerMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    spaces[computerMove] = O_TEXT
    boxes[computerMove].innerText = O_TEXT
    if (playerHasWon() !== false) {
      playerText.innerHTML = `${O_TEXT} has won!`
      let winning_blocks = playerHasWon()
      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
      removeListeners()
      return
    }
    currentPlayer = X_TEXT
  }
  

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition
    if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a, b, c]
    }
  }
  return false
}

function removeListeners() {
  boxes.forEach(box => box.removeEventListener('click', boxClicked))
}

function restart() {
    spaces.fill(null)
    boxes.forEach(box => {
      box.innerText = ''
      box.style.backgroundColor = ''
    })
    playerText.innerHTML = 'Tic Tac Toe'
    currentPlayer = X_TEXT
    if (gameMode === 'computer') {
      makeComputerMove()
      boxes.forEach(box => box.addEventListener('click', boxClicked))
    } else {
      boxes.forEach(box => box.addEventListener('click', boxClicked))
    }
  }
  

startGame()
