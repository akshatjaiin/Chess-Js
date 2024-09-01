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

let draggedElement;

let startPositionId
function dragStart (e) {
  startPositionId = e.target.parentNode.getAttribute('square-id');
  startPositionId = e.target.parentNode.getAttribute('square-id');
  draggedElement = e.target; // store the dragged element
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation();
  let opponentGo = playerGo === 'black' ? 'white' : 'black';
  const correctGo = draggedElement.classList.contains(playerGo); // Check if the piece belongs to the current player
  const targetSquare = e.target.classList.contains('square') ? e.target : e.target.parentNode; // Get the square
  const takenByOpponent = targetSquare.firstChild?.classList.contains(opponentGo); // Check if the target square contains an opponent's piece
  const valid = checkValidMove(targetSquare); // Check if the move is valid

  if (correctGo && valid) {
    // If the target square has an opponent's piece, remove it (capture)
    if (takenByOpponent) {
      targetSquare.removeChild(targetSquare.firstChild); // Remove the opponent's piece
    }

    // Move the piece to the new square
    targetSquare.appendChild(draggedElement);

    // Switch turns
    changePlayer();
  } else {
    // If the move is invalid, show a message
    infoDisplay.textContent = "Invalid move!";
    setTimeout(() => infoDisplay.textContent = "", 2000);
  }
}


function changePlayer() {
  if (playerGo === "black") {
    reverseIds()
    playerGo = "white"
    playerDisplay.textContent = "white"
  }
  else {
    revertIds()
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

let draggedPiece



function checkValidMove(target) {
  if (!target || !target.firstChild) {
    return false; // or handle this case differently if needed
  }

  
  const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))

  const startId = Number(startPositionId)
  const piece = draggedElement.id
  console.log('startId, startId')
  console.log(piece)

  switch(piece) {
    case 'pawn' :
      const starterRow = [8, 9, 10, 11 , 12, 13, 14, 15]
      if (starterRow.includes(startId) && startId + width * 2 === targetId || startId + width === targetId || document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild || document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ){
        return true
      }
      break;

    case 'knight':
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId 
      ) {
        return true
      }
      break;

      case 'bishop':
        if (
          startId + width + 1 === targetId ||
          startId + width - 1 === targetId ||
          startId - width + 1 === targetId ||
          startId - width - 1 === targetId ||
          startId + 2 * width + 2 === targetId ||
          startId + 2 * width - 2 === targetId ||
          startId - 2 * width + 2 === targetId ||
          startId - 2 * width - 2 === targetId ||
          startId + 3 * width + 3 === targetId ||
          startId + 3 * width - 3 === targetId ||
          startId - 3 * width + 3 === targetId ||
          startId - 3 * width - 3 === targetId ||
          startId + 4 * width + 4 === targetId ||
          startId + 4 * width - 4 === targetId ||
          startId - 4 * width + 4 === targetId ||
          startId - 4 * width - 4 === targetId ||
          startId + 5 * width + 5 === targetId ||
          startId + 5 * width - 5 === targetId ||
          startId - 5 * width + 5 === targetId ||
          startId - 5 * width - 5 === targetId ||
          startId + 6 * width + 6 === targetId ||
          startId + 6 * width - 6 === targetId ||
          startId - 6 * width + 6 === targetId ||
          startId - 6 * width - 6 === targetId ||
          startId + 7 * width + 7 === targetId ||
          startId + 7 * width - 7 === targetId ||
          startId - 7 * width + 7 === targetId ||
          startId - 7 * width - 7 === targetId 
        ) {
          return true
        }
        break;

        case 'rook':
          if (
            startId + 1 === targetId || startId - 1 === targetId ||
            startId + width === targetId || startId - width === targetId ||
            startId + 2 === targetId ||  startId - 2 === targetId ||
            startId + 2 * width === targetId || startId - 2 * width === targetId ||
            startId + 3 === targetId || startId - 3 === targetId ||
            startId + 3 * width === targetId || startId - 3 * width === targetId ||
            startId + 4 === targetId || startId - 4 === targetId ||
            startId + 4 * width === targetId || startId - 4 * width === targetId ||
            startId + 5 === targetId || startId - 5 === targetId ||
            startId + 5 * width === targetId || startId - 5 * width === targetId ||
            startId + 6 === targetId ||  startId - 6 === targetId ||
            startId + 6 * width === targetId || startId - 6 * width === targetId ||
            startId + 7 === targetId || startId - 7 === targetId ||
            startId + 7 * width === targetId || startId - 7 * width === targetId
          ) {
            return true
          }
          break;

          case 'queen':
            // Combine the bishop's and rook's movements
            if (
              // Bishop's movements (diagonal)
              startId + width + 1 === targetId ||
              startId + width - 1 === targetId ||
              startId - width + 1 === targetId ||
              startId - width - 1 === targetId ||
              startId + 2 * width + 2 === targetId ||
              startId + 2 * width - 2 === targetId ||
              startId - 2 * width + 2 === targetId ||
              startId - 2 * width - 2 === targetId ||
              startId + 3 * width + 3 === targetId ||
              startId + 3 * width - 3 === targetId ||
              startId - 3 * width + 3 === targetId ||
              startId - 3 * width - 3 === targetId ||
              startId + 4 * width + 4 === targetId ||
              startId + 4 * width - 4 === targetId ||
              startId - 4 * width + 4 === targetId ||
              startId - 4 * width - 4 === targetId ||
              startId + 5 * width + 5 === targetId ||
              startId + 5 * width - 5 === targetId ||
              startId - 5 * width + 5 === targetId ||
              startId - 5 * width - 5 === targetId ||
              startId + 6 * width + 6 === targetId ||
              startId + 6 * width - 6 === targetId ||
              startId - 6 * width + 6 === targetId ||
              startId - 6 * width - 6 === targetId ||
              startId + 7 * width + 7 === targetId ||
              startId + 7 * width - 7 === targetId ||
              startId - 7 * width + 7 === targetId ||
              startId - 7 * width - 7 === targetId ||
              // Rook's movements (horizontal and vertical)
              startId + 1 === targetId ||
              startId - 1 === targetId ||
              startId + width === targetId ||
              startId - width === targetId ||
              startId + 2 === targetId ||
              startId - 2 === targetId ||
              startId + 2 * width === targetId ||
              startId - 2 * width === targetId ||
              startId + 3 === targetId ||
              startId - 3 === targetId ||
              startId + 3 * width === targetId ||
              startId - 3 * width === targetId ||
              startId + 4 === targetId ||
              startId - 4 === targetId ||
              startId + 4 * width === targetId ||
              startId - 4 * width === targetId ||
              startId + 5 === targetId ||
              startId - 5 === targetId ||
              startId + 5 * width === targetId ||
              startId - 5 * width === targetId ||
              startId + 6 === targetId ||
              startId - 6 === targetId ||
              startId + 6 * width === targetId ||
              startId - 6 * width === targetId ||
              startId + 7 === targetId ||
              startId - 7 === targetId ||
              startId + 7 * width === targetId ||
              startId - 7 * width === targetId
            ) {
              return true
            }
            break;
    case 'king':
      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width -1 === targetId ||
        startId + width +1 === targetId ||
        startId - width -1 === targetId||
        startId - width +1 === targetId
      ) {
        return true
      }
    }

    

 }

// Event listeners for each square
allSquares.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})


