# ♟️ JavaScript Chess Game

Welcome to the **JavaScript Chess Game**! This is a simple and interactive chess game built using JavaScript, HTML, and CSS. The game allows two players to play chess directly in the browser with drag-and-drop functionality for moving pieces.

## 🎮 Features

- **Interactive Gameplay**: Move pieces by dragging and dropping them onto the desired square.
- **Turn-Based System**: The game alternates between black and white players.
- **Valid Moves Only**: The game ensures that only valid moves are made according to chess rules.
- **Visual Feedback**: The game highlights invalid moves and provides player feedback.

## 🛠️ Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/chess-game.git
    ```
2. Navigate to the project directory:
    ```bash
    cd chess-game
    ```
3. Open the `index.html` file in your browser to start playing.

## 🕹️ How to Play

1. **Drag and Drop**: Click on a piece to drag it, then drop it onto the target square.
2. **Turn Order**: The game starts with the black player. After each valid move, the turn switches to the other player.
3. **Valid Moves**: The game checks for valid moves based on the selected piece:
   - **Pawns** can move forward one square, two squares from their starting position, or capture diagonally.
   - **Knights** move in an "L" shape: two squares in one direction and one square perpendicular.
   - **Bishops** move diagonally across the board.
   - **Rooks** move vertically or horizontally.
   - **Queens** combine the movements of both the rook and the bishop.
   - **Kings** move one square in any direction.
4. **Winning the Game**: Capture the opponent's king to win the game!

## 🧩 Code Overview

- `createBoard()`: Initializes the chessboard and pieces.
- `dragStart()`: Handles the logic when a piece is picked up.
- `dragOver()`: Allows the dragged piece to be moved over a square.
- `dragDrop()`: Handles the logic when a piece is dropped on a square.
- `checkValidMove()`: Verifies if the move is valid based on chess rules.
- `changePlayer()`: Switches the turn between players.

## 🚀 Future Improvements

- **AI Opponent**: Implementing a computer player for solo gameplay.
- **Highlighting**: Adding visual indicators for possible moves.
- **Undo/Redo Moves**: Allowing players to undo or redo their last move.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements.


Enjoy the game and happy playing! 🏆
