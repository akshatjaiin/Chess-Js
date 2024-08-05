const gameBoard = document.querySelector('#gameboard')
const plaerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const width = 8

const startPieces = [
  rook, knight, bishop, queen, king, bishop, knight, rook,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn, 
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn, 
  rook, knight, bishop, queen, king, bishop, knight, rook,
]

function createBoard() {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPiece
    square.firstChild?.setAttribute('draggable', true)
    square.setAttribute('square-id', i)
   // square.classList.add('beige')
   const row = Math.floor((63 - i) / 8 + 1)
   if (row % 2 === 0) {
    square.classList.add(i % 2 === 0 ? "brown" : "beige");
  } else {
    square.classList.add(i % 2 === 0 ? "beige" : "brown");
  }
   
  if (i <= 15 && startPiece !== '') {
    square.firstChild.classList.add('black')
  }
  if (i >= 48 && startPiece !== '') {
    square.firstChild.classList.add('white')
  }
    gameBoard.append(square)
  })
}

createBoard()

const allSquares = document.querySelectorAll('#gameboard .square')

allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)

})
let startPositionId
function dragStart (e) {
  startPositionId = console.log(e.target.parentNode.getAttribute('square-id'))
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()

  e.target.parentNode.append
}

let draggedPiece

function dragStart(e) {
  draggedPiece = e.target
  startPositionId = e.target.parentNode.getAttribute('square-id')
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()
  const endPositionId = e.target.getAttribute('square-id') || e.target.parentNode.getAttribute('square-id')
  const validMove = checkValidMove(startPositionId, endPositionId, draggedPiece)

  if (validMove) {
    if (e.target.classList.contains('square')) {
      e.target.append(draggedPiece)
    } else {
      e.target.parentNode.append(draggedPiece)
    }
    updateGameState()
  }
}

function checkValidMove(startId, endId, piece) {
  // Implement the logic to check if the move is valid based on piece type and rules of chess
  // For simplicity, we'll just allow any move for now
  return true
}

function updateGameState() {
  // Add logic to update the game state after a valid move
  // For example, you can check for checkmate, stalemate, etc.
  // Update player display to switch turns
}

// Event listeners for each square
allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})

