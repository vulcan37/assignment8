let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let count = 0;
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
  const id = e.target.id

  if (!spaces[id]) {
    spaces[id] = currentPlayer
    e.target.innerText = currentPlayer

    if (playerHasWon() !== false) {
      document.getElementById("turn").innerText = currentPlayer == X_TEXT ? "player1 has won" : "player2 has won"
      document.getElementById("restart-text").innerHTML = "press restart to start new game"
      let winning_blocks = playerHasWon()

      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
      return
    }
    count += 1


    document.getElementById("restart-text").innerHTML = `${count}`
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    document.getElementById("turn").innerText = count == 9 ? "game draw" : currentPlayer == X_TEXT ? "player1 turn(X)" : "player2 turn(O)"
    document.getElementById("restart-text").innerHTML = count == 9 ? "press restart to start new game" : ""

  }
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

restartBtn.addEventListener('click', restart)

function restart() {
  spaces.fill(null)
  document.getElementById("turn").innerText = "player1 turn(X)"
  document.getElementById("restart-text").innerHTML = ""
  count = 0
  currentPlayer = X_TEXT


  boxes.forEach(box => {
    box.innerText = ''
    box.style.backgroundColor = ''
  })

  playerText.innerHTML = 'Tic Tac Toe'

  currentPlayer = X_TEXT
}

startGame()