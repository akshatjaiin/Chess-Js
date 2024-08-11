const gameBoard = document.querySelector('#gameboard')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

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
  const correctGo = draggedElement.firstChild.classList.contains(playerGo)
  const taken = e.target.classList.contains('piece')
  const opponentGo = playerGo === 'white' ? 'black' : 'white'
  const valid = checkIfValid(e.target)
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

  if (correctGo) {
    // if taken by oppnent and valid then do something
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement)
      e.target.remove()
      changePlayer()
      return
    }

    if (taken && !takenByOpponent)  {
      infoDisplay.textContent = "you cannot go here !!"
      setTimeout(() =>infoDisplay.textContent = "", 2000)
      return
    }
    if (valid) {
      e.target.append(draggedElement)
      changePlayer()
      return
    }
  }
  
}

function changePlayer() {
  if (playerGo === "black") {
    playerGo = "white"
    playerDisplay.textContent = "white"
  }
  else {
    playerGo = "black"
    playerDisplay.textContent = "black"
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => {
  square.setAttribute('square-id', (width*width - 1) - i)
    
  });
}

function revertIds() {
  const allSquares = document.querySelectorAll('.square')
  allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}

// let draggedPiece



// function checkValidMove(startId, endId, piece) {
//   // Implementing basic movement logic for all pieces
//   const startRow = Math.floor(startId / 8)
//   const startCol = startId % 8
//   const endRow = Math.floor(endId / 8)
//   const endCol = endId % 8
//   const deltaRow = Math.abs(endRow - startRow)
//   const deltaCol = Math.abs(endCol - startCol)

//   const pieceType = piece.innerHTML
//   const pieceColor = piece.classList.contains('white') ? 'white' : 'black'

//   // Prevent moving the opponent's pieces
//   if (pieceColor !== currentPlayer) return false;

//   // Pawns
//   if (pieceType === '♙' || pieceType === '♟︎') {
//       const direction = pieceType === '♙' ? -1 : 1
//       if (deltaCol === 0 && deltaRow === 1 && !document.querySelector(`[square-id='${endId}']`).firstChild) {
//           return true
//       }
//       if (deltaCol === 1 && deltaRow === 1 && document.querySelector(`[square-id='${endId}']`).firstChild) {
//           return true
//       }
//       return false
//   }

//   // Rooks
//   if (pieceType === '♖' || pieceType === '♜') {
//       if (deltaRow === 0 || deltaCol === 0) return true
//       return false
//   }

//   // Knights
//   if (pieceType === '♘' || pieceType === '♞') {
//       if (deltaRow === 2 && deltaCol === 1 || deltaRow === 1 && deltaCol === 2) return true
//       return false
//   }

//   // Bishops
//   if (pieceType === '♗' || pieceType === '♝') {
//       if (deltaRow === deltaCol) return true
//       return false
//   }

//   // Queens
//   if (pieceType === '♕' || pieceType === '♛') {
//       if (deltaRow === 0 || deltaCol === 0 || deltaRow === deltaCol) return true
//       return false
//   }

//   // Kings
//   if (pieceType === '♔' || pieceType === '♚') {
//       if (deltaRow <= 1 && deltaCol <= 1) return true
//       return false
//   }

//   return false
// }

// function updateGameState(endPositionId) {
//   const capturedPiece = document.querySelector(`[square-id='${endPositionId}']`).firstChild
//   if (capturedPiece && (capturedPiece.innerHTML === '♔' || capturedPiece.innerHTML === '♚')) {
//       infoDisplay.textContent = `${currentPlayer === 'white' ? 'Black' : 'White'} wins!`
//       allSquares.forEach(square => {
//           square.removeEventListener('dragstart', dragStart)
//           square.removeEventListener('dragover', dragOver)
//           square.removeEventListener('drop', dragDrop)
//       })
//       return
//   }

//   currentPlayer = currentPlayer === 'white' ? 'black' : 'white'
//   playerDisplay.textContent = `Current Player: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`
// }

// Event listeners for each square
allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})



