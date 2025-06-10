import React from "react";

function GameOverModal({ show, finalScore, onRestart }) {
  if (!show) return null;

  return (
    <div className="game-over">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        <p>You clicked the same card twice!</p>
        <p>
          Final Score: <span>{finalScore}</span>
        </p>
        <button className="btn" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;
