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
      updateGameState(endPositionId)
  }
}

function checkValidMove(startId, endId, piece) {
  // Implementing basic movement logic for all pieces
  const startRow = Math.floor(startId / 8)
  const startCol = startId % 8
  const endRow = Math.floor(endId / 8)
  const endCol = endId % 8
  const deltaRow = Math.abs(endRow - startRow)
  const deltaCol = Math.abs(endCol - startCol)

  const pieceType = piece.innerHTML
  const pieceColor = piece.classList.contains('white') ? 'white' : 'black'

  // Prevent moving the opponent's pieces
  if (pieceColor !== currentPlayer) return false;

  // Pawns
  if (pieceType === '♙' || pieceType === '♟︎') {
      const direction = pieceType === '♙' ? -1 : 1
      if (deltaCol === 0 && deltaRow === 1 && !document.querySelector(`[square-id='${endId}']`).firstChild) {
          return true
      }
      if (deltaCol === 1 && deltaRow === 1 && document.querySelector(`[square-id='${endId}']`).firstChild) {
          return true
      }
      return false
  }

  // Rooks
  if (pieceType === '♖' || pieceType === '♜') {
      if (deltaRow === 0 || deltaCol === 0) return true
      return false
  }

  // Knights
  if (pieceType === '♘' || pieceType === '♞') {
      if (deltaRow === 2 && deltaCol === 1 || deltaRow === 1 && deltaCol === 2) return true
      return false
  }

  // Bishops
  if (pieceType === '♗' || pieceType === '♝') {
      if (deltaRow === deltaCol) return true
      return false
  }

  // Queens
  if (pieceType === '♕' || pieceType === '♛') {
      if (deltaRow === 0 || deltaCol === 0 || deltaRow === deltaCol) return true
      return false
  }

  // Kings
  if (pieceType === '♔' || pieceType === '♚') {
      if (deltaRow <= 1 && deltaCol <= 1) return true
      return false
  }

  return false
}

function updateGameState(endPositionId) {
  const capturedPiece = document.querySelector(`[square-id='${endPositionId}']`).firstChild
  if (capturedPiece && (capturedPiece.innerHTML === '♔' || capturedPiece.innerHTML === '♚')) {
      infoDisplay.textContent = `${currentPlayer === 'white' ? 'Black' : 'White'} wins!`
      allSquares.forEach(square => {
          square.removeEventListener('dragstart', dragStart)
          square.removeEventListener('dragover', dragOver)
          square.removeEventListener('drop', dragDrop)
      })
      return
  }

  currentPlayer = currentPlayer === 'white' ? 'black' : 'white'
  playerDisplay.textContent = `Current Player: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`
}

// Event listeners for each square
allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})


// Event listeners for each square
allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})

