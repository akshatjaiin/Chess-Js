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
      const diagonalDirections = [width + 1, width - 1, -width + 1, -width - 1]; // bottom-right, bottom-left, top-right, top-left
      let isValidMove = false;
  
      for (let direction of diagonalDirections) {
          let currentId = startId;
          
          while (true) {
              currentId += direction;
  
              // Check if the move is out of bounds
              if (currentId < 0 || currentId >= boardSize || 
                  (direction === width + 1 || direction === -width - 1) && Math.floor(currentId / width) !== Math.floor((currentId - direction) / width) ||
                  (direction === width - 1 || direction === -width + 1) && Math.floor(currentId / width) !== Math.floor((currentId - direction) / width)) {
                  break;
              }
  
              // Check if the current square is the target
              if (currentId === targetId) {
                  return true
              }
  
              // Stop if a piece is blocking the path
              if (document.querySelector(`[square-id="${currentId}"]`).firstChild) {
                  break;
              }
          }
      }
      break;
  

    case 'rook':
      const directions = [1, -1, width, -width]; // right, left, down, up

      for (let direction of directions) {
          let currentId = startId;
          
          while (true) {
              currentId += direction;
              
              // Check if the move is out of bounds
              if (currentId < 0 || currentId >= boardSize || 
                  (direction === 1 || direction === -1) && Math.floor(currentId / width) !== Math.floor((currentId - direction) / width)) {
                  break;
              }

              // Check if the current square is the target
              if (currentId === targetId) {
                  return true;
              }

              // Stop if a piece is blocking the path
              if (document.querySelector(`[square-id="${currentId}"]`).firstChild) {
                  break;
              }
          }
      }
      break;

    case 'queen':
      const directions = [
          1, -1,            // right, left (horizontal)
          width, -width,    // down, up (vertical)
          width + 1,        // bottom-right (diagonal)
          width - 1,        // bottom-left (diagonal)
          -width + 1,       // top-right (diagonal)
          -width - 1        // top-left (diagonal)
      ];
  
      for (let direction of directions) {
          let currentId = startId;
          
          while (true) {
              currentId += direction;
  
              // Check if the move is out of bounds
              if (currentId < 0 || currentId >= boardSize || 
                  (direction === 1 || direction === -1) && Math.floor(currentId / width) !== Math.floor((currentId - direction) / width) ||
                  (direction === width + 1 || direction === -width - 1) && Math.floor(currentId / width) !== Math.floor((currentId - direction) / width) ||
                  (direction === width - 1 || direction === -width + 1) && Math.floor(currentId / width) !== Math.floor((currentId - direction) / width)) {
                  break;
              }
  
              // Check if the current square is the target
              if (currentId === targetId) {
                  return true;
              }
  
              // Stop if a piece is blocking the path
              if (document.querySelector(`[square-id="${currentId}"]`).firstChild) {
                  break;
              }
          }
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



f