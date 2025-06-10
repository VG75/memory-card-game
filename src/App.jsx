import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import GameBoard from "./components/GameBoard";
import GameOverModal from "./components/GameOverModal";
import LoadingSpinner from "./components/LoadingSpinner";
import {
  generateRandomPokemonIds,
  fetchMultiplePokemon,
} from "./utils/pokemonApi";

function App() {
  // Game state
  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState(new Set());
  //Game Logic
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [round, setRound] = useState(1);

  //UI states
  const [isLoading, setIsLoading] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false);
  const [error, setError] = useState(null);

  // Load best score from memory when component mounts
  useEffect(() => {
    const savedBestScore = localStorage.getItem("bestScore");
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Save best score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("bestScore", bestScore.toString());
  }, [bestScore]);

  // Fetch Pokemon data
  const fetchPokemon = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const randomIds = generateRandomPokemonIds();
      const pokemonData = await fetchMultiplePokemon(randomIds);
      setPokemon(pokemonData);
    } catch (error) {
      setError("Failed to fetch Pokemon data. Please try again.");
      console.error("Error fetching Pokemon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial Pokemon fetch
  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleCardClick = (pokemonId) => {
    if (clickedPokemon.has(pokemonId)) {
      setShowGameOver(true);
      return;
    }

    setClickedPokemon((prev) => new Set([...prev, pokemonId]));
    setCurrentScore((prev) => prev + 1);

    if (currentScore + 1 > bestScore) {
      setBestScore(currentScore + 1);
    }
  };

  const handleRestart = () => {
    setCurrentScore(0);
    setClickedPokemon(new Set());
    setShowGameOver(false);
    setRound(1);
    fetchPokemon();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎮 Memory Card Game</h1>
        <p>Click on cards, but don't click the same one twice!</p>
      </div>

      <Scoreboard
        currentScore={currentScore}
        bestScore={bestScore}
        round={round}
      />

      <div className="controls">
        <button className="btn" onClick={handleRestart}>
          New Game
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button className="btn" onClick={fetchPokemon}>
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <GameBoard
          pokemon={pokemon}
          onCardClick={handleCardClick}
          clickedPokemon={clickedPokemon}
        />
      )}

      <GameOverModal
        show={showGameOver}
        finalScore={currentScore}
        onRestart={handleRestart}
      />
    </div>
  );
}

export default App;
