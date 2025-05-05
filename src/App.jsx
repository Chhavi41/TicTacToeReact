import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";

function deriveActivePlayer(prevTurn) {
  let currentPlayer = 'X';
  if (prevTurn.length && prevTurn[0].player === 'X') {
    currentPlayer  = 'O';
  }
  return currentPlayer;
}

function deriveWinner(rcount, ccount, dcount) {
  for (let count of rcount.concat(ccount, dcount)) {
    if (count === 3) return 'X';
    if (count === -3) return 'O';
  }
  return null;
}


function App() {
  const [gameTurns, setGameTurn] = useState([]);
  const [rowCount, setRowCount] = useState([0,0,0]);
  const [colCount, setColCount] = useState([0,0,0]);
  const [diagCount, setDiagCount] = useState([0,0]);

  let activePlayer = deriveActivePlayer(gameTurns)
  let winner = deriveWinner(rowCount, colCount, diagCount);
  let hasDraw = (!winner && gameTurns.length === 9) ? true:false;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn(
      (prevTurn) => {
        const currentPlayer = deriveActivePlayer(prevTurn)
        const updatedTurn = [{ square: {row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurn];
        return updatedTurn;
      }
    );
    const val = activePlayer === 'X' ? 1 : -1;
    setRowCount(
      (prevCount) => {
        const updated = [...prevCount];
        updated[rowIndex] += val;
        return updated;
      }
    )
    setColCount(
      (prevCount) => {
        const updated = [...prevCount];
        updated[colIndex] += val;
        return updated;
      }
    )
    if (rowIndex === colIndex || rowIndex+colIndex === 2) {
      setDiagCount(
        (prevCount) => {
          const updated = [...prevCount]
          if (rowIndex === colIndex) {
            updated[0] += val;
          } else {
            updated[1] += val;
          }
          return updated;
        }
      )
    }
  }

  function handleRestart() {
    setColCount([0,0,0])
    setDiagCount([0,0])
    setGameTurn([])
    setRowCount([0,0,0])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
           <Player initialname="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
           <Player initialname="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
         <GameBoard 
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        /> 
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}


export default App
