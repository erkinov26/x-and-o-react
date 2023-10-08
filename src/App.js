import { useState } from "react";
import "./App.css";

function App() {
  const initialItems = Array(9).fill(null);
  const [clickedItems, setClickedItems] = useState(initialItems);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winnnerInfo, setWinnnerInfo] = useState(null);
  const [gameState, setGameState] = useState("inProgress"); // Initially, the game is in progress
  console.log(clickedItems);

  function winner() {
    let winCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winCombination.forEach((e) => {
      if (
        clickedItems[e[0]] === clickedItems[e[1]] &&
        clickedItems[e[1]] === clickedItems[e[2]] &&
        clickedItems[e[2]]
      ) {
        setTimeout(() => {
          setGameState("over");
          setWinnnerInfo(currentPlayer === "X" ? "O is winner" : "X is winner");
        }, 100);
      }
    });
  }
  winner();
  const handleClick = (index) => {
    if (clickedItems[index] === null) {
      const newClickedItems = [...clickedItems];
      newClickedItems[index] = currentPlayer;
      setClickedItems(newClickedItems);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      setWinnnerInfo(null);
    }
  };

  return (
    <div className="App">
      <h1 className="gameTitle"> X And O Game</h1>
      <div className="gameBox">
        {clickedItems.map((item, index) => (
          <button
            key={index}
            className={`box ${item ? `clicked${item}` : ""} ${
              currentPlayer === "X" &&
              item === null &&
              gameState === "inProgress"
                ? "xHover"
                : currentPlayer === "O" &&
                  item === null &&
                  gameState === "inProgress"
                ? "oHover"
                : undefined
            }`}
            disabled={item || gameState === "over"}
            onClick={() => handleClick(index)}
          ></button>
        ))}
      </div>
      {gameState === "over" && (
        <div>
          <h1 className="title">{winnnerInfo}</h1>
          <button
            className={"btn btn-secondary"}
            onClick={() => {
              setClickedItems(Array(9).fill(null));
              setCurrentPlayer("X");
              setGameState("inProgress");
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
