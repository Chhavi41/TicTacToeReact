import { useState } from "react"

export default function Player({initialname, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(initialname);
    const [isEditing, setIsEditing] = useState(false);
    function buttonClicked() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? 'active': undefined}>
        <span className="player">
          {isEditing ? <input type="text" value={playerName} onChange={handleChange
        }  required /> : <span className="player-name">{playerName}</span>}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={buttonClicked}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    )
}