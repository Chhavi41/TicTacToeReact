🚀 Getting Started
1. Clone the Repository
```
git clone https://github.com/Chhavi41/TicTacToeReact.git
cd TicTacToeReact
```

2. Install Dependencies
Make sure Node.js and npm are installed on your system.
```
npm install

```

3. Start the Development Server
```
npm run dev
```

🧩 Key Concepts & Design Decisions
✅ 1. Why is gameTurns the only state in the ancestor (App) component?
gameTurns stores the full move history of the game. Every move includes the player and the square selected.
This single source of truth allows all components (like Player, GameOver, and GameBoard) to derive their required state without duplicating or syncing multiple state variables.

✅ 2. Why not store game board state directly in GameBoard?
Instead of storing a separate board state, we derive the current board from the gameTurns array.

This avoids:
Data duplication
State syncing bugs
Unnecessary re-renders

 3. Why lift state up (like gameTurns) to App?
Shared state like gameTurns is used by multiple components:
Player uses it to highlight the active player.
GameBoard renders the board from it.
GameOver determines game outcome from it.
Log shows move history from it.

By lifting gameTurns to the ancestor, all components stay synchronized and don't need to track or update separate local copies.


🏁 Game Logic Overview
In this React Tic Tac Toe game, the logic for determining the winner or a draw has been optimized for constant time checks (O(1)) per move using rowCount, colCount, and diagCount arrays.

🔁 Turn Management
Players take alternating turns:
Player X starts first.
Player O goes next.
This alternation is tracked by analyzing the last move made (via the gameTurns array).

🧮 Move Encoding
Each player move is encoded numerically:
Player X contributes +1 to the corresponding row/column/diagonal.
Player O contributes -1.
This encoding enables the game to track win conditions using simple arithmetic, rather than checking all possible board combinations after every move.

📊 Optimized Win Check Using Counters
The game maintains three key state variables to track cumulative counts:
```
const [rowCount, setRowCount] = useState([0, 0, 0]);    // 3 rows
const [colCount, setColCount] = useState([0, 0, 0]);    // 3 columns
const [diagCount, setDiagCount] = useState([0, 0]);     // [main diagonal, anti-diagonal]
```
When a move is made:
The player's value (+1 or -1) is added to:
The appropriate row (based on the square’s row index)
The appropriate column (based on the square’s column index)
The appropriate diagonal(s), if applicable

🏆 Instant Win Detection
Instead of scanning the entire board, the winner is derived using:
```
function deriveWinner(rcount, ccount, dcount) {
  for (let count of rcount.concat(ccount, dcount)) {
    if (count === 3) return 'X';     // X wins
    if (count === -3) return 'O';    // O wins
  }
  return null;
}
```

Time Complexity: O(1) per move.
We check a total of 8 counters: 3 rows + 3 columns + 2 diagonals.
No nested loops, no 2D array traversal—just a flat check of 8 integers.
This method ensures:
Minimal performance overhead
Fast and deterministic outcome evaluation
Scalability (e.g., can be extended to NxN board with minor changes)


