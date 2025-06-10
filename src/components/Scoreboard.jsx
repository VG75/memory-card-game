import React from "react";

function Scoreboard({ currentScore, bestScore, round }) {
  return (
    <div className="scoreboard">
      <div className="score-item">
        <h3>Current Score</h3>
        <div className="score-value">{currentScore}</div>
      </div>
      <div className="score-item">
        <h3>Best Score</h3>
        <div className="score-value">{bestScore}</div>
      </div>
      <div className="score-item">
        <h3>Round</h3>
        <div className="score-value">{round}</div>
      </div>
    </div>
  );
}

export default Scoreboard;
