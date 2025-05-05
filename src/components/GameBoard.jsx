const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]
export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = [...initialGameBoard.map((inner) => [...inner])];
    // deriving from the state
    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)
    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameturnsBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(inner => [...inner])];
    //         updatedBoard[rowIndex][colIndex] = activePlayer;
    //         return updatedBoard;
    //     })
    //     onSelectSquare();
    // }
    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button disabled={playerSymbol !== null} onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}