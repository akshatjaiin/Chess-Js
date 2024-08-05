let selectedPiece = null;




const gameBoard = document.querySelector('#gameboard')
const plaerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#infoDisplay')
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
  startPieces.forEach((startPiece) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPiece
    square.setAttribute('square-id', i)
    gameBoard.append(square)
  })
}














function handleMove(event) {
  const cell = event.target;
  const row = cell.parentElement.getAttribute('data-row');
  const col = cell.getAttribute('data-col');

  if (!selectedPiece) {
    // Select the piece
    selectedPiece = { row, col, piece: cell.innerHTML };
    cell.classList.add('selected'); // Add a class to highlight the selected piece
  } else {
    // Move the piece
    const targetRow = row;
    const targetCol = col;

    // Update the board array
    board[targetRow][targetCol] = selectedPiece.piece;
    board[selectedPiece.row][selectedPiece.col] = '';

    // Clear the selection
    selectedPiece = null;
    document.querySelector('.selected').classList.remove('selected');

    // Re-render the board
    renderBoard();
  }
}

function renderBoard() {
  document.querySelectorAll('.board tr').forEach((row, rowIndex) => {
    row.querySelectorAll('td').forEach((cell, colIndex) => {
      if (rowIndex > 0 && colIndex > 0) { // Skip the row and column headers
        cell.innerHTML = board[rowIndex - 1][colIndex - 1];
      }
    });
  });
}