const squares = document.querySelectorAll('.square');
let currentPlayer = 2;
let gameBoard = [null, null, null, null, null, null, null, null, null];

squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (currentPlayer === 1 && !square.classList.contains('player1') && !square.classList.contains('player2')) {
      square.classList.add('player1');
      gameBoard[index] = 1;
      currentPlayer = 2;
      checkForWinner();
    } else if (currentPlayer === 2 && !square.classList.contains('player1') && !square.classList.contains('player2')) {
      square.classList.add('player2');
      gameBoard[index] = 2;
      currentPlayer = 1;
      checkForWinner();
    }
  });
});

const resetButton = document.querySelector('.reset-button');

resetButton.addEventListener('click', resetBoard);

function resetBoard() {
  squares.forEach((square) => {
    square.classList.remove('player1', 'player2');
  });
  currentPlayer = 1;
  gameBoard = [null, null, null, null, null, null, null, null, null];
  gameOverContainer.style.display = "none"
}

const gameOverContainer = document.querySelector('.game-over-container');
const resultText = document.querySelector('.result-text');
const playAgainButton = document.querySelector('.play-again-button');

function gameOver(winner) {
  let message;

  if (winner === 'tie') {
    message = 'The game is a tie!';
  } else {
    message = `Player ${winner} has won the game!`;
  }

  resultText.textContent = message;
  gameOverContainer.classList.add('game-over');
  gameOverContainer.classList.add('game-over-animation');
    gameOverContainer.style.display = "flex"
}

playAgainButton.addEventListener('click', () => {
  gameOverContainer.style.display = "none"
  resetBoard();
});

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkForWinner() {
  let winner = null;

  winningCombinations.forEach((combo) => {
    if (
      gameBoard[combo[0]] !== null &&
      gameBoard[combo[0]] === gameBoard[combo[1]] &&
      gameBoard[combo[1]] === gameBoard[combo[2]]
    ) {
      winner = gameBoard[combo[0]];
    }
  });

  if (winner !== null) {
    gameOver(winner);
  } else if (!gameBoard.includes(null)) {
    gameOver('tie');
  }
}